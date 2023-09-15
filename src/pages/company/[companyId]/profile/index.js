import { Auth } from 'aws-amplify'
import CompanyProfile from 'containers/CompanyProfile'
import PublicCompanyView from 'containers/PublicCompanyView'
import MainLayout from 'layouts/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const CompanyProfileView = () => {
  const {
    query: { companyId },
  } = useRouter()
  const [uiState, setUiState] = useState(null)
  const userId = uiState?.attributes?.sub

  useEffect(() => {
    checkUserAuth()
  }, [])

  async function checkUserAuth() {
    try {
      setUiState('loading')
      const user = await Auth.currentAuthenticatedUser()
      setUiState(user)
    } catch (err) {
      setUiState('unauthenticatedProfileView')
    }
  }

  if (uiState === 'unauthenticatedProfileView') return <PublicCompanyView companyId={companyId} isOptions={false} />

  if (userId) return <CompanyProfile userId={userId} />

  return null
}

CompanyProfileView.getLayout = (page) => <MainLayout isPublic>{page}</MainLayout>

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'companyProfile',
        'companyMenu',
        'accountMenu',
        'common',
        'addKeyContact',
      ])),
    },
  }
}

export default CompanyProfileView
