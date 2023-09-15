import { gql } from '@apollo/client'

export const profileSectionFragment = gql`
  fragment ProfileSectionFragment on CompanyProfileSection {
    _type
    companyId
    creationTimestamp
    id
    modificationTimestamp
    name
    orderIndex
    profileSectionType
    visibilityLevel
    items {
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
`
