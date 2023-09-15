import { gql } from '@apollo/client'

export const DELETE_PROFILE_SECTION_ITEM = gql`
  mutation deleteProfileSectionItem($id: ID!) {
    deleteProfileSectionItem(id: $id) {
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
`
