import { gql } from '@apollo/client'
import { companyGeneralDataFragment } from 'api/hooks/fragments'

export const UPDATE_COMPANY_PROFILE = gql`
  mutation updateCompany($input: UpdateCompanyInput!) {
    updateCompany(input: $input) {
      ...CompanyGeneralDataFragment
    }
  }
  ${companyGeneralDataFragment}
`
