import { useMutation } from '@apollo/client'

import { DELETE_COMPANY_CHANNEL } from './useDeleteCompanyChannel.gql'

export const useDeleteCompanyChannel = (options) => {
  const mutation = useMutation(DELETE_COMPANY_CHANNEL, options)

  return mutation
}
