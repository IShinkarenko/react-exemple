import { gql } from '@apollo/client'
import { profileSectionFragment } from 'api/hooks/fragments'

export const UPDATE_COMPANY_PROFILE_SECTION = gql`
  mutation updateCompanyProfileSection($input: UpdateCompanyProfileSectionInput!) {
    __typename
    updateCompanyProfileSection(input: $input) {
      ...ProfileSectionFragment
    }
  }
  ${profileSectionFragment}
`
