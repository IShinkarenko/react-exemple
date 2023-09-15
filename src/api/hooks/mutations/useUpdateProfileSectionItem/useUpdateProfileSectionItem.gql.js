import { gql } from '@apollo/client'

export const UPDATE_PROFILE_SECTION_ITEM = gql`
  mutation updateProfileSectionItem($input: UpdateProfileSectionItemInput!) {
    __typename
    updateProfileSectionItem(input: $input) {
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
