import { useCompany, usePreferences } from 'api/hooks'
import { Auth, withSSRContext } from 'aws-amplify'
import { PageLoader } from 'components'
import { DEFAULT_CHANNEL, DEFAULT_CHANNEL_NONE, DEFAULT_COMPANY, NEW } from 'constant'
import UnauthenticatedSearch from 'containers/UnauthenticatedSearch'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import routes from 'routes'
import { getPreferenceId } from 'utils'

const IndexPage = ({ userId: ssrUser }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { signOutLoading } = useAppState()
  const [uiState, setUiState] = useState(null)
  const userId = ssrUser || uiState?.attributes?.sub
  const { data: data_preferences } = usePreferences({
    skip: !userId,
    variables: { id: userId },
  })
  const defaultCompanyId = getPreferenceId(data_preferences, DEFAULT_COMPANY)
  const defaultChannelId = getPreferenceId(data_preferences, DEFAULT_CHANNEL)

  const { data: data_company } = useCompany({ skip: !defaultCompanyId, variables: { id: defaultCompanyId } })
  const company = data_company?.getCompany
  const isNewCompany = company?.status === NEW

  useEffect(() => {
    checkUserAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (signOutLoading) {
      dispatch({ type: 'SET_SIGN_OUT_LOADING', payload: false })
    }
  }, [signOutLoading, dispatch])

  useEffect(() => {
    if (uiState !== 'loading' && uiState) {
      dispatch({ type: 'SET_SIGN_IN_LOADING', payload: false })
      if (defaultChannelId && defaultChannelId !== DEFAULT_CHANNEL_NONE) {
        return router.push({
          pathname: routes.companyChannel,
          query: { companyId: defaultCompanyId, channelId: defaultChannelId },
        })
      } else if (defaultChannelId && defaultChannelId === DEFAULT_CHANNEL_NONE) {
        return router.push({
          pathname: routes.companyProfile,
          query: { companyId: defaultCompanyId },
        })
      }

      if (isNewCompany) {
        return router.push({
          pathname: routes.companySetup,
          query: { companyId: defaultCompanyId },
        })
      }
    }
  }, [defaultChannelId, defaultCompanyId, dispatch, isNewCompany, router, uiState])

  async function checkUserAuth() {
    try {
      setUiState('loading')
      const user = await Auth.currentAuthenticatedUser()
      setUiState(user)
    } catch (err) {
      setUiState('unauthenticatedSearch')
    }
  }

  if (uiState === 'unauthenticatedSearch') return <UnauthenticatedSearch />

  return <PageLoader />
}

IndexPage.getLayout = (page) => page

export const getServerSideProps = async ({ locale, req }) => {
  const { Auth } = withSSRContext({ req })
  let userProps = {}

  try {
    const user = await Auth.currentAuthenticatedUser()

    userProps = {
      userId: user.attributes.sub,
    }
  } catch (err) {
    console.log('error, user not authenticated')
  }

  return {
    props: {
      ...userProps,
      ...(await serverSideTranslations(locale, ['common', 'unauthenticatedSearch', 'accountMenu', 'tags'])),
    },
  }
}

export default IndexPage
