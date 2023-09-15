import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_RELATIONSHIP } from './useUpdateCompanyRelationship.gql'

export const useUpdateCompanyRelationship = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_RELATIONSHIP, options)

  return mutation
}
