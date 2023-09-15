import { useMutation } from '@apollo/client'

import { CREATE_COMPANY_CHANNEL } from './useCreateCompanyChannel.gql'

export const useCreateCompanyChannel = (options) => {
  const mutation = useMutation(CREATE_COMPANY_CHANNEL, options)

  return mutation
}
