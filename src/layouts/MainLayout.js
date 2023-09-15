import { Box, useMediaQuery } from '@mui/material'
import { useCompany } from 'api/hooks'
import { Auth, Hub } from 'aws-amplify'
import clsx from 'clsx'
import { Footer, Header, PageLoader, VerificationScreen } from 'components'
import { CONFIRM_SIGN_UP, SIGN_IN, SIGNED_IN } from 'constant'
import AuthContainer from 'containers/Auth'
import Sidebar from 'containers/Sidebar'
import SystemAlerts from 'containers/SystemAlerts'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { addListeners, removeListeners } from 'libs/amplify-auth-link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'routes'

import useStyles from './styles'

const MainLayout = ({ children, loading, authPage, isPublic, fullWidth, sidebar = true }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const matches = useMediaQuery('(max-width:600px)')
  const dispatch = useAppDispatch()
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const { authFormType, signInLoading, rootLoading, user, tokenRefreshed } = useAppState()
  const { loading: companyLoading, data } = useCompany({
    variables: { id: companyId },
  })
  const isAthentificated = (authFormType === SIGNED_IN && user !== null) || tokenRefreshed
  const isMainLayout = isAthentificated || authPage || isPublic
  const company = data?.getCompany
  const isPending = company?.status === 'PendingVerification'

  useEffect(() => {
    if (rootLoading) {
      dispatch({ type: 'SET_ROOT_LOADING', payload: false })
    }
  }, [dispatch, rootLoading])

  useEffect(() => {
    Hub.listen('auth', updateUser)
    updateUser()
    setAuthListener()
    const handler = addListeners()

    return () => {
      Hub.remove('auth', updateUser)
      removeListeners(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function updateUser() {
    try {
      await Auth.currentAuthenticatedUser().then((user) => {
        dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGNED_IN })
        dispatch({ type: 'SET_USER', payload: user })
      })
    } catch {
      console.log('catch')
    }
  }

  async function setAuthListener() {
    Hub.listen('auth', (data) => {
      console.log('MainLayout data.payload.event', data.payload.event)
      switch (data.payload.event) {
        case 'signOut':
          dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
          dispatch({ type: 'SET_AUTH_ERROR', payload: null })
          dispatch({ type: 'SET_USER', payload: null })
          break
        case 'signUp':
          dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: CONFIRM_SIGN_UP })
          break
        case 'tokenRefresh':
          dispatch({ type: 'SET_TOKEN_REFRESHED', payload: true })
          break
        default:
          break
      }
    })
  }

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen)
  }, [mobileOpen])

  const handleBack = useCallback(() => {
    router.push(routes.home)
  }, [router])

  if (signInLoading || rootLoading || companyLoading) return <PageLoader />

  if (isPending) return <VerificationScreen companyName={company?.name} handleBack={handleBack} />

  return (
    <>
      <Header handleDrawerToggle={handleDrawerToggle} />

      <Box display="flex" flex={1} pt={matches ? '56px' : '69px'} pb={'50px'}>
        {isMainLayout ? (
          <>
            {sidebar && isAthentificated && <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />}

            <Box className={classes.mainContainer}>
              <Box className={clsx(classes.main, !isAthentificated && classes.unauthorizedMainContainer)}>
                {loading ? (
                  <PageLoader />
                ) : (
                  <>
                    <SystemAlerts />

                    {children}
                  </>
                )}
              </Box>
            </Box>
          </>
        ) : (
          <Box className={classes.mainContainer}>{loading ? <PageLoader /> : <AuthContainer />}</Box>
        )}
      </Box>

      <Footer fullWidth={!isAthentificated || fullWidth} />

      {/* <Zendes defer zendeskKey={ZENDESK_KEY} {...ZENDESK_SETTINGS} /> */}
    </>
  )
}

export default MainLayout
