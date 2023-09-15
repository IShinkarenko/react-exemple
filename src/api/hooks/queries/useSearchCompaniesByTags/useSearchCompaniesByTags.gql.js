import { gql } from '@apollo/client'

export const SEARCH_COMPANIES_BY_TAGS = gql`
  query searchCompaniesByTags($input: CompanySearchResultsFilterInput) {
    searchCompaniesByTags(input: $input) {
      maxScore
      total
      items {
        _type
        description
        creationTimestamp
        id
        locale
        location
        logoUrl
        modificationTimestamp
        name
        objectiveMatches
        visibilityLevel
        status
      }
    }
  }
`
