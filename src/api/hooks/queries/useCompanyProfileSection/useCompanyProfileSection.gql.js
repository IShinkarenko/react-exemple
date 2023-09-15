import { gql } from '@apollo/client'

import { profileSectionFragment } from './../../fragments'

export const GET_COMPANY_PROFILE_SECTION = gql`
  query GetCompanyProfileSection($id: ID!) {
    getCompanyProfileSection(id: $id) {
      ...ProfileSectionFragment
    }
  }
  ${profileSectionFragment}
`
