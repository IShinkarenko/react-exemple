import { useQuery } from '@apollo/client'

import { GET_COMPANY_RELATIONSHIP_NOTES } from './useCompanyRealtionshipNotes.gql'

export const useCompanyRealtionshipNotes = (options) => {
  const companyRealtionshipNotes = useQuery(GET_COMPANY_RELATIONSHIP_NOTES, options)

  return companyRealtionshipNotes
}
