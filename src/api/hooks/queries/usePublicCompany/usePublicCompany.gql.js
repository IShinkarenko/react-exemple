import { gql } from '@apollo/client'

export const GET_PUBLIC_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      _type
      id
      name
      description
      bannerUrl
      companySize
      foundingYear
      locale
      logoUrl
      visibilityLevel
      websiteUrl
      location
      publiclyTraded
      status
      industry
    }
  }
`
