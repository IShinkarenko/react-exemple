import { gql } from '@apollo/client'
import { profileSectionFragment } from 'api/hooks/fragments'

export const GET_COMPANY_PROFILE_SECTIONS = gql`
  query GetCompany($id: ID!, $filter: ModelCompanyProfileSectionFastFilterInput) {
    getCompany(id: $id) {
      id
      profileSections(filter: $filter) {
        items {
          ...ProfileSectionFragment
        }
        nextToken
      }
    }
  }
  ${profileSectionFragment}
`
