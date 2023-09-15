import { gql } from '@apollo/client'

import { profileSectionFragment } from './../../fragments'

export const DELETE_COMPANY_PROFILE_SECTION = gql`
  mutation deleteCompanyProfileSection($id: ID!) {
    deleteCompanyProfileSection(id: $id) {
      ...ProfileSectionFragment
    }
  }
  ${profileSectionFragment}
`
