import Relationships from 'containers/Relationships'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const CompanyRelationships = () => {
  return <Relationships />
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['relationships', 'companyMenu', 'accountMenu', 'common'])),
  },
})

export default CompanyRelationships
