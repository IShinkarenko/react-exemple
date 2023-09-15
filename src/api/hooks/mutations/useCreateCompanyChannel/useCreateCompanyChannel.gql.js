import { gql } from '@apollo/client'

export const CREATE_COMPANY_CHANNEL = gql`
  mutation createCompanyChannel($input: CreateCompanyChannelInput!) {
    createCompanyChannel(input: $input) {
      _type
      companyId
      creationTimestamp
      description
      id
      imageUrl
      instanceStatus
      modificationTimestamp
      name
      orderIndex
      tags {
        label
        tagType
        value
      }
    }
  }
`
