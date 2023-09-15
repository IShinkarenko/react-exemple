import { useMutation } from '@apollo/client'

import { CLAIM_EXIST_COMPANY } from './useClaimExistingCompany.gql'

export const useClaimExistingCompany = (options) => {
  const mutation = useMutation(CLAIM_EXIST_COMPANY, options)

  return mutation
}
