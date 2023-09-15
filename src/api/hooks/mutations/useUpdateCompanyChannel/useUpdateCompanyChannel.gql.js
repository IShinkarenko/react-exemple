import { gql } from '@apollo/client'

export const UPDATE_COMPANY_CHANNEL = gql`
  mutation updateCompanyChannel($input: UpdateCompanyChannelInput!) {
    updateCompanyChannel(input: $input) {
      _type
      id
      companyId
      name
      orderIndex
      instanceStatus
      tags {
        label
        tagType
        value
      }
    }
  }
`
