import { useMutation } from '@apollo/client'

import { DELETE_COMPANY_RELATIONSHIP } from './useDeleteCompanyRelationship.gql'

export const useDeleteCompanyRelationship = (options) => {
  const mutation = useMutation(DELETE_COMPANY_RELATIONSHIP, options)

  return mutation
}
