import { useLazyQuery } from '@apollo/client'
import { SEARCH_COMPANIES_BY_TAGS } from 'api/hooks/queries/useSearchCompaniesByTags/useSearchCompaniesByTags.gql'
import { SEARCH_COMPANIES_BY_TEXT } from 'api/hooks/queries/useSearchCompaniesByText/useSearchCompaniesByText.gql'
import { WIZZARD_SEARCH } from 'constant'

export const useSearchResults = ({ searchType }) => {
  const [getTagsSearch, { loading: searchTagsLoading, data: tags_results_data, error: tagsError }] = useLazyQuery(
    SEARCH_COMPANIES_BY_TAGS,
    { fetchPolicy: 'no-cache' }
  )
  const [getTextSearch, { loading: searchTextLoading, data: text_results_data, error: textError }] = useLazyQuery(
    SEARCH_COMPANIES_BY_TEXT,
    { fetchPolicy: 'no-cache' }
  )

  const resultsbyTags = tags_results_data?.searchCompaniesByTags?.items
  const resultsbyText = text_results_data?.searchCompaniesByText?.items

  const totalResultsbyTags = tags_results_data?.searchCompaniesByTags?.total
  const totalResultsbyText = text_results_data?.searchCompaniesByText?.total

  const companiesData = searchType === WIZZARD_SEARCH ? resultsbyTags : resultsbyText
  const total = searchType === WIZZARD_SEARCH ? totalResultsbyTags : totalResultsbyText
  const isLoading =
    searchType === WIZZARD_SEARCH ? searchTagsLoading || !tags_results_data : searchTextLoading || !text_results_data

  return { getTagsSearch, getTextSearch, tagsError, textError, companiesData, total, isLoading }
}
