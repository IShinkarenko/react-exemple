import { ApolloClient, concat, HttpLink, InMemoryCache } from '@apollo/client'
import { getDataFromTree } from '@apollo/client/react/ssr'
import withApollo from 'next-with-apollo'
import getConfig from 'next/config'

import { createAuthLink } from './amplify-auth-link'
import companiesArrayMerging from './cache/merge/CompaniesArrayMerging'
import MembersArrayMerging from './cache/merge/MembersArrayMerging'
import relationshipArrayMerging from './cache/merge/RelationshipArrayMerging'

const { publicRuntimeConfig } = getConfig()

function createApolloClient({ initialState, headers }) {
  const url = publicRuntimeConfig.aws_appsync_graphqlEndpoint

  const appSyncConfig = {
    url: publicRuntimeConfig.aws_appsync_graphqlEndpoint,
    region: publicRuntimeConfig.aws_appsync_region,
  }

  return new ApolloClient({
    link: concat(
      createAuthLink(appSyncConfig),
      new HttpLink({
        uri: url,
        credentials: 'same-origin',
        headers: {
          cookie: headers?.cookie,
        },
      })
    ),

    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getUser: {
              merge(existing, incoming) {
                return incoming
              },
            },
          },
        },
        CompanyRelationship: {
          fields: {
            notes: relationshipArrayMerging(),
          },
        },
        User: {
          fields: {
            companies: companiesArrayMerging(),
          },
        },
        Company: {
          fields: {
            users: MembersArrayMerging(),
          },
        },
      },
    }).restore(initialState),
  })
}

export default withApollo(createApolloClient, { getDataFromTree })
