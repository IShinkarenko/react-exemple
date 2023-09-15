import { Header } from 'components'
import PublicCompanyView from 'containers/PublicCompanyView'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'

const PublicCompanyPage = () => {
  const router = useRouter()
  const { publicId } = router.query

  return (
    <>
      <Header isAuthButtons />

      <PublicCompanyView companyId={publicId} />
    </>
  )
}

PublicCompanyPage.getLayout = (page) => page

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['searchResults', 'companyProfile', 'common'])),
  },
})

export default PublicCompanyPage
