import { useQuery } from '@apollo/client'

import { GET_TEXT_SUMMARY } from './useGetTextSummary.gql'

export const useGetTextSummary = (options) => {
  const textSummary = useQuery(GET_TEXT_SUMMARY, options)

  return textSummary
}
