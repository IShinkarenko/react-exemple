import { gql } from '@apollo/client'

export const CREATE_PROFILE_SECTION_ITEM = gql`
  mutation createProfileSectionItem($input: CreateProfileSectionItemInput!) {
    createProfileSectionItem(input: $input) {
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
