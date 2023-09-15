import { gql } from '@apollo/client'

import { profileSectionFragment } from './../../fragments'

export const CREATE_COMPANY_PROFILE_SECTION = gql`
  mutation createCompanyProfileSection($input: CreateCompanyProfileSectionInput!) {
    createCompanyProfileSection(input: $input) {
      ...ProfileSectionFragment
    }
  }
  ${profileSectionFragment}
`
