import { useMutation } from '@apollo/client'

import { DELETE_BATCH_COMPANY_RELATIONSHIP } from './useDeleteBatchCompanyRelationship.gql'

export const useDeleteBatchCompanyRelationship = (options) => {
  const mutation = useMutation(DELETE_BATCH_COMPANY_RELATIONSHIP, options)

  return mutation
}
