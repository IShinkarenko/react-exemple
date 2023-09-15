import { gql } from '@apollo/client'

export const CLAIM_EXIST_COMPANY = gql`
  mutation claimExistingCompany($input: ClaimExistingCompanyInput!) {
    claimExistingCompany(input: $input) {
      _type
      id
    }
  }
`
