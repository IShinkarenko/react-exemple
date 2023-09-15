import { gql } from '@apollo/client'

export const GET_COMPANIES_BY_DOMAIN = gql`
  query searchCompaniesByDomain($domain: String!) {
    searchCompaniesByDomain(domain: $domain) {
      items {
        id
        name
        _type
        creationTimestamp
        description
        locale
        location
        logoUrl
        modificationTimestamp
        objectiveMatches
        status
        visibilityLevel
      }
    }
  }
`
