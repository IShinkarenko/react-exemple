import { gql } from '@apollo/client'

export const GET_PROFILE_SECTION_ITEM = gql`
  query GetProfileSectionItem($id: ID!) {
    getProfileSectionItem(id: $id) {
      _type
      id
      name
      companyProfileSectionId
      creationTimestamp
      modificationTimestamp
      orderIndex
      sectionItemType
      value
      visibilityLevel
    }
  }
`
