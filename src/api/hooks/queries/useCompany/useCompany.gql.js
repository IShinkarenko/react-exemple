import { gql } from '@apollo/client'
import { companyGeneralDataFragment } from 'api/hooks/fragments'

export const GET_COMPANY = gql`
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      ...CompanyGeneralDataFragment
    }
  }
  ${companyGeneralDataFragment}
`
