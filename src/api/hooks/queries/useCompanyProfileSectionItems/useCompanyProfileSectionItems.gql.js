import { gql } from '@apollo/client'

export const GET_COMPANY_PROFILE_SECTION_ITEMS = gql`
  query GetCompanyProfileSection($id: ID!, $filter: ModelProfileSectionItemFastFilterInput) {
    getCompanyProfileSection(id: $id) {
      id
      items(filter: $filter) {
        items {
          _type
          companyProfileSectionId
          creationTimestamp
          id
          modificationTimestamp
          name
          orderIndex
          sectionItemType
          value
          visibilityLevel
        }
      }
    }
  }
`
