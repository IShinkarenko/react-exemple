import 'draft-js/dist/Draft.css'
import 'draftail/dist/draftail.css'
import '@egjs/react-flicking/dist/flicking.css'
import '@egjs/flicking-plugins/dist/arrow.css'
import 'react-toastify/dist/ReactToastify.css'
import 'styles.css'

import { ApolloProvider } from '@apollo/client'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CssBaseline from '@mui/material/CssBaseline'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { Amplify } from 'aws-amplify'
import { Head } from 'components'
import { AppProvider } from 'hooks/useAppState'
import MainLayout from 'layouts/MainLayout'
import withData from 'libs/apolloClient'
import { appWithTranslation } from 'next-i18next'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { compose } from 'redux'
import theme from 'theme'

const { publicRuntimeConfig } = getConfig()

Amplify.configure({
  aws_project_region: publicRuntimeConfig.aws_project_region,
  aws_appsync_graphqlEndpoint: publicRuntimeConfig.aws_appsync_graphqlEndpoint,
  aws_appsync_region: publicRuntimeConfig.aws_appsync_region,
  aws_appsync_authenticationType: publicRuntimeConfig.aws_appsync_authenticationType,
  aws_cognito_region: publicRuntimeConfig.aws_cognito_region,
  aws_cognito_identity_pool_id: publicRuntimeConfig.aws_cognito_identity_pool_id,
  aws_user_pools_id: publicRuntimeConfig.aws_user_pools_id,
  aws_user_pools_web_client_id: publicRuntimeConfig.aws_user_pools_web_client_id,
  mandatorySignIn: publicRuntimeConfig.mandatorySignIn,
  aws_mobile_analytics_app_id: publicRuntimeConfig.aws_mobile_analytics_app_id,
  aws_mobile_analytics_app_region: publicRuntimeConfig.aws_mobile_analytics_app_region,
  ssr: true,
})

const MyApp = ({ Component, pageProps, apollo }) => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const getLayout = Component.getLayout || ((page) => <MainLayout children={page} loading={loading} />)

  useEffect(() => {
    const handleRouteChange = () => setLoading(true)
    const handleRouteComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleRouteChange)
    router.events.on('routeChangeComplete', handleRouteComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
      router.events.off('routeChangeComplete', handleRouteComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ApolloProvider client={apollo}>
              <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>

              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
              />
            </ApolloProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </LocalizationProvider>
    </>
  )
}
// TODO remove redux
export default compose(withData, appWithTranslation)(MyApp)
