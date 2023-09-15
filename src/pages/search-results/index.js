import { Auth } from 'aws-amplify'
import { Footer, Header, PageLoader } from 'components'
import UnauthenticatedSearchResults from 'containers/UnauthenticatedSearchResults'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'routes'

import useStyles from './styles'

const SearchResults = () => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const [uiState, setUiState] = useState(null)

  useEffect(() => {
    checkUserAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function checkUserAuth() {
    try {
      setUiState('loading')
      const user = await Auth.currentAuthenticatedUser()
      setUiState(user)
      router.push(routes.home)
    } catch (err) {
      setUiState('unauthenticated')
    }
  }

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen)
  }, [mobileOpen])

  if (uiState === 'unauthenticated')
    return (
      <>
        <Header isAuthButtons isButton handleDrawerToggle={handleDrawerToggle} />

        <UnauthenticatedSearchResults mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        <Footer ml={'350px'} className={classes.resultsFooter} />
      </>
    )

  return <PageLoader />
}

SearchResults.getLayout = (page) => page

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'searchResults',
      'companyProfile',
      'accountMenu',
      'footer',
      'common',
      'tags',
      'auth',
    ])),
  },
})

export default SearchResults
