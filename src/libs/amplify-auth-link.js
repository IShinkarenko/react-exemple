import { ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import Auth from '@aws-amplify/auth'
import { Hub } from '@aws-amplify/core'
import { AUTH_TYPE, createAuthLink as awsCreateAuthLink } from 'aws-appsync-auth-link'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

let amplifyAuthLink = null
let region
let url

// Create an ApolloLink that uses API_KEY/Cognito based on sign-in state.
// Uses a cached AuthLink created by aws-appsync-auth-link under the covers.
export const createAuthLink = (appSyncConfig) => {
  region = appSyncConfig.region
  url = appSyncConfig.url
  return cachedAmplifyAuthLink.concat(
    new ApolloLink((operation, forward) => operation.getContext().amplifyAuthLink.request(operation, forward)),
    resetToken
  )
}

// Create an AWS AuthLink that uses Cognito, suitable for signed-in users.
const createCognitoAuthLink = (session) =>
  awsCreateAuthLink({
    auth: {
      jwtToken: session.getIdToken().getJwtToken(),
      type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    },
    region,
    url,
  })

// Create an AWS AuthLink that uses API_KEY, suitable for non signed-in users.
const createAPIAuthLink = () => {
  return awsCreateAuthLink({
    auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: publicRuntimeConfig.aws_appsync_apiKey,
    },
    region,
    url,
  })
}

// An ApolloLink that uses context to cache the amplifyAuthLink instance.
const cachedAmplifyAuthLink = setContext(() => {
  if (amplifyAuthLink) {
    return { amplifyAuthLink }
  }

  // Asynchronously initialise and cache amplifyAuthLink.
  return Auth.currentSession()
    .then((session) => {
      amplifyAuthLink = createCognitoAuthLink(session)
      return { amplifyAuthLink }
    })
    .catch((error) => {
      console.log(error)
      amplifyAuthLink = createAPIAuthLink()
      return { amplifyAuthLink }
    })
})

const resetToken = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
  }

  if (networkError?.name == 'ServerError' && networkError?.statusCode == 401) {
    amplifyAuthLink = createAPIAuthLink()
  } else {
    console.log(`[Network error]: ${networkError}`)
  }
})

export const refreshToken = async () => {
  try {
    const currentSession = await Auth.currentSession()

    amplifyAuthLink = createCognitoAuthLink(currentSession)
  } catch (e) {
    console.log('Unable to refresh Token', e)
  }
}

// Add Hub auth listeners, to detect sign-in/out.
export const addListeners = () => {
  const handleAuthEvents = ({ payload }) => {
    switch (payload.event) {
      case 'signIn':
        amplifyAuthLink = createCognitoAuthLink(payload.data.signInUserSession)
        break
      case 'signOut':
        amplifyAuthLink = createAPIAuthLink()
        break
      case 'tokenRefresh':
        if (payload.message === 'New token retrieved') {
          return refreshToken()
        }
        break
      default:
        break
    }
  }
  Hub.listen('auth', handleAuthEvents)

  return handleAuthEvents
}

// Remove Hub auth listeners.
export const removeListeners = (handler) => Hub.remove('auth', handler)
