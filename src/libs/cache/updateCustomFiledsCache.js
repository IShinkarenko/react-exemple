import { GET_COMPANY_RELATIONSHIP } from 'api/hooks/queries/useCompanyRealtionship/useCompanyRealtionship.gql'

export const updateCustomFiledsCache = ({ profileId, cache, data: { updateCompanyRelationship } }) => {
  const { getCompanyRelationship } = cache.readQuery({
    query: GET_COMPANY_RELATIONSHIP,
    variables: {
      id: profileId,
    },
  })

  const newCustomFields = [...getCompanyRelationship?.customFields, updateCompanyRelationship]

  cache.writeQuery({
    query: GET_COMPANY_RELATIONSHIP,
    variables: {
      id: profileId,
    },
    data: {
      getCompanyRelationship: { ...getCompanyRelationship, customFields: newCustomFields },
    },
  })
}
