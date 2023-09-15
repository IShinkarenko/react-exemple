/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery } from '@apollo/client'
import { Alert, Box } from '@mui/material'
import { useCreateUserNotification } from 'api/hooks'
import { GET_TEXT_SUMMARY } from 'api/hooks/queries/useGetTextSummary/useGetTextSummary.gql'
import { Analytics, Auth } from 'aws-amplify'
import {
  CONFIRM_SIGN_UP,
  RESET_PASSWORD,
  RESET_PASSWORD_SUBMIT,
  SIGN_IN,
  SIGN_UP,
  SIGNED_IN,
  TEXT_SUMMARY,
} from 'constant'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { updateNotificationsCache } from 'libs/cache/updateNotificationsCache'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { toast } from 'react-toastify'
import routes from 'routes'

import ResetPassword from './components/ResetPassword'
import ResetPasswordSubmit from './components/ResetPasswordSubmit'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SignUpConfirm from './components/SignUpConfirm'
import useStyles from './styles'

const AuthContainer = () => {
  const classes = useStyles()
  const router = useRouter()
  const { authFormType, username, authError } = useAppState()
  const dispatch = useAppDispatch()
  const pathname = router.pathname
  const [createUserNotification] = useCreateUserNotification({
    onCompleted: () => {
      localStorage.removeItem('claimedCompany')
      localStorage.removeItem('followedCompany')
      localStorage.removeItem('connectedCompany')
    },
  })
  const [getTextSummary] = useLazyQuery(GET_TEXT_SUMMARY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => handleCreateTextSummaryNotification(data),
  })

  const setAuthFormType = useCallback(
    (nextAuthState) => {
      dispatch({ type: 'SET_AUTH_ERROR', payload: null })
      dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: nextAuthState })
    },
    [dispatch]
  )

  const signIn = useCallback(
    async ({ username, password }) => {
      await Auth.signIn(username, password)
        .then((user) => {
          const claimedCompany = localStorage.getItem('claimedCompany')
          const followedCompany = localStorage.getItem('followedCompany')
          const connectedCompany = localStorage.getItem('connectedCompany')
          const description = localStorage.getItem('signUpDescription')
          const claimed = JSON.parse(claimedCompany)
          const followed = JSON.parse(followedCompany)
          const connected = JSON.parse(connectedCompany)
          const hasLocalStorageNotification = claimedCompany || followedCompany || connectedCompany

          const getInput = () => {
            const baseInput = {
              isNew: true,
              notificationType: 'SystemAlert',
              userId: user?.attributes?.sub,
            }
            if (claimedCompany) {
              return {
                headline: `Claim ${claimed?.name}`,
                message: 'You indicated your desire to claim this company profile',
                metaData: claimedCompany,
                ...baseInput,
              }
            } else if (followedCompany) {
              return {
                headline: `Follow ${followed?.name}`,
                message: 'You indicated your desire to follow this company profile',
                metaData: followedCompany,
                ...baseInput,
              }
            } else if (connectedCompany) {
              return {
                headline: `Connect With ${connected?.name}`,
                message: 'You indicated your desire to connect with this company profile',
                metaData: connectedCompany,
                ...baseInput,
              }
            }
          }

          Analytics.record({ name: 'SignIn' })

          dispatch({ type: 'SET_SIGN_IN_LOADING', payload: true })
          dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGNED_IN })
          dispatch({ type: 'SET_USER', payload: user })

          localStorage.removeItem('tags')
          localStorage.removeItem('text')

          if (hasLocalStorageNotification) {
            const normilizedInput = {
              input: getInput(),
            }
            createUserNotification({
              variables: normilizedInput,
              update: (cache, { data }) => updateNotificationsCache({ userId: user?.attributes?.sub, cache, data }),
            })
          }

          if (description) {
            getTextSummary({
              variables: {
                text: description,
              },
            })
          }

          if (pathname === routes.signIn) {
            router.push(routes.home)
          } else {
            dispatch({ type: 'SET_SIGN_IN_LOADING', payload: false })
          }
        })
        .catch((err) => {
          dispatch({ type: 'SET_AUTH_ERROR', payload: err.message })
        })
    },
    [dispatch, pathname, createUserNotification, router]
  )

  const confirmSignUp = useCallback(
    async ({ username, code }) => {
      try {
        await Auth.confirmSignUp(username, code)
        toast('Your Account is confirmed successfully')
        dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
      } catch (err) {
        dispatch({ type: 'SET_AUTH_ERROR', payload: err.message })
      }
    },
    [dispatch]
  )

  const resendConfirmationCode = useCallback(async () => {
    try {
      await Auth.resendSignUp(username)
      toast('Code resent successfully')
    } catch (err) {
      dispatch({ type: 'SET_AUTH_ERROR', payload: err.message })
    }
  }, [dispatch, username])

  const forgotPassword = useCallback(
    ({ username }) => {
      Auth.forgotPassword(username)
        .then(() => {
          dispatch({ type: 'SET_USERNAME', payload: username })
          dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: RESET_PASSWORD_SUBMIT })
          toast('Code resent successfully')
        })
        .catch((err) => dispatch({ type: 'SET_AUTH_ERROR', payload: err.message }))
    },
    [dispatch]
  )

  const forgotPasswordSubmit = useCallback(
    ({ username, code, new_password }) => {
      Auth.forgotPasswordSubmit(username, code, new_password)
        .then(() => {
          dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
          toast('Password reset successfully')
        })
        .catch((err) => dispatch({ type: 'SET_AUTH_ERROR', payload: err.message }))
    },
    [dispatch]
  )

  const handleCreateTextSummaryNotification = useCallback((data) => {
    const textSummary = data?.getTextSummary

    if (!textSummary) {
      return
    }
    createUserNotification({
      variables: {
        input: {
          headline: 'Suggested Text Summary',
          message: textSummary,
          metaData: JSON.stringify({ type: TEXT_SUMMARY }),
        },
      },
    })
  }, [])

  const renderAuthForm = () => {
    switch (authFormType) {
      case SIGN_IN:
        return <SignIn username={username} signIn={signIn} setAuthFormType={setAuthFormType} />
      case SIGN_UP:
        return <SignUp setAuthFormType={setAuthFormType} />
      case CONFIRM_SIGN_UP:
        return (
          <SignUpConfirm
            username={username}
            confirmSignUp={confirmSignUp}
            resendConfirmationCode={resendConfirmationCode}
          />
        )
      case RESET_PASSWORD:
        return <ResetPassword forgotPassword={forgotPassword} setAuthFormType={setAuthFormType} />
      case RESET_PASSWORD_SUBMIT:
        return (
          <ResetPasswordSubmit
            username={username}
            setAuthFormType={setAuthFormType}
            forgotPasswordSubmit={forgotPasswordSubmit}
          />
        )
    }
  }

  return (
    <Box className={classes.authWrap}>
      <Box className={classes.authContainer}>
        {authError && (
          <Box mb={3}>
            <Alert severity="error">{authError}</Alert>
          </Box>
        )}

        {renderAuthForm()}
      </Box>
    </Box>
  )
}

export default AuthContainer
