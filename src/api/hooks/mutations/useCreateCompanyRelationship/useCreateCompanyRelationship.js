import { useMutation } from '@apollo/client'

import { CREATE_COMPANY_RELATIONSHIP } from './useCreateCompanyRelationship.gql'

export const useCreateCompanyRelationship = (options) => {
  const mutation = useMutation(CREATE_COMPANY_RELATIONSHIP, options)

  return mutation
}
