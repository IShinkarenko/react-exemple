import AssistedSearch from 'containers/AssistedSearch'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const AssistedResearch = () => {
  return <AssistedSearch />
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'assistedResearch',
      'unauthenticatedSearch',
      'companyMenu',
      'accountMenu',
      'tags',
    ])),
  },
})

export default AssistedResearch
