import { useMutation } from '@apollo/client'

import { UPDATE_COMPANY_CHANNEL } from './useUpdateCompanyChannel.gql'

export const useUpdateCompanyChannel = (options) => {
  const mutation = useMutation(UPDATE_COMPANY_CHANNEL, options)

  return mutation
}
