import Channel from 'containers/Channel'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const CompanyChannel = () => {
  return <Channel />
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'channels',
      'companyMenu',
      'accountMenu',
      'companyProfile',
      'footer',
      'common',
    ])),
  },
})

export default CompanyChannel
