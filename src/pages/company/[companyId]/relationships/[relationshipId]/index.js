import Relationship from 'containers/Relationship'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const CompanyRelationship = () => {
  return <Relationship />
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['relationships', 'companyMenu', 'accountMenu', 'common'])),
  },
})

export default CompanyRelationship
