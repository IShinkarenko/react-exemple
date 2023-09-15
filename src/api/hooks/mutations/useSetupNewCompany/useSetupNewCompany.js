import { useMutation } from '@apollo/client'

import { SETUP_NEW_COMPANY } from './useSetupNewCompany.gql'

export const useSetupNewCompany = (options) => {
  const mutation = useMutation(SETUP_NEW_COMPANY, options)

  return mutation
}
