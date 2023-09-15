import { useQuery } from '@apollo/client'

import { GET_COMPANY_PAYMENT_CONFIG } from './useCompanyPaymentConfig.gql'

export const useCompanyPaymentConfig = (options) => {
  const paymentConfig = useQuery(GET_COMPANY_PAYMENT_CONFIG, options)

  return paymentConfig
}
