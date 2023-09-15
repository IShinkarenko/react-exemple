import { useQuery } from '@apollo/client'

import { GET_COMPANY_RELATIONSHIP_KEY_CONTACTS } from './useCompanyRealtionshipKeyContacts.gql'

export const useCompanyRealtionshipKeyContacts = (options) => {
  const companyRealtionshipKeyContacts = useQuery(GET_COMPANY_RELATIONSHIP_KEY_CONTACTS, options)

  return companyRealtionshipKeyContacts
}
