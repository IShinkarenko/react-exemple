import { gql } from '@apollo/client'

export const companyGeneralDataFragment = gql`
  fragment CompanyGeneralDataFragment on Company {
    _type
    bannerUrl
    companySize
    description
    discount
    foundingYear
    id
    locale
    location
    logoUrl
    industry
    name
    namespace
    parentId
    promoCode
    providerCompanyId
    providerCompanyName
    region
    status
    paymentsConfig
    subscriptionId
    subscriptionLevel
    tags {
      label
      tagType
      value
    }
    visibilityLevel
    websiteUrl
  }
`
