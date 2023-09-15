import { Auth } from 'aws-amplify'
import { PageLoader } from 'components'
import AuthContainer from 'containers/Auth'
import MainLayout from 'layouts/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import routes from 'routes'

const SignInPage = () => {
  const [uiState, setUiState] = useState(null)
  const router = useRouter()

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

  if (uiState === 'unauthenticated') return <AuthContainer />

  return <PageLoader />
}

SignInPage.getLayout = (page) => (
  <MainLayout sidebar={false} authPage fullWidth>
    {page}
  </MainLayout>
)

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'auth', 'searchResults', 'tags'])),
  },
})

export default SignInPage
