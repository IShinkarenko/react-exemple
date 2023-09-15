import { gql } from '@apollo/client'

export const SEARCH_COMPANIES_BY_TEXT = gql`
  query searchCompaniesByText($input: CompanyTextSearchResultsFilterInput) {
    searchCompaniesByText(input: $input) {
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
