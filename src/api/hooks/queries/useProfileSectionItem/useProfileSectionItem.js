import { useQuery } from '@apollo/client'

import { GET_PROFILE_SECTION_ITEM } from './useProfileSectionItem.gql'

export const useProfileSectionItem = (options) => {
  const profileSectionItem = useQuery(GET_PROFILE_SECTION_ITEM, options)

  return profileSectionItem
}
