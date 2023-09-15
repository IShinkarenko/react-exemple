import { GET_COMPANY_RELATIONSHIPS } from 'api/hooks/queries/useCompanyRealtionships/useCompanyRealtionships.gql'

export const updateRelationshipsCache = ({ companyId, cache, data: { createCompanyRelationship } }) => {
  const { getCompany } = cache.readQuery({
    query: GET_COMPANY_RELATIONSHIPS,
    variables: {
      id: companyId,
    },
  })

  const newRelationships = [...getCompany?.relationships?.items, createCompanyRelationship]

  cache.writeQuery({
    query: GET_COMPANY_RELATIONSHIPS,
    variables: {
      id: companyId,
    },
    data: {
      getCompany: {
        ...getCompany,
        relationships: { ...getCompany?.relationships, items: newRelationships },
      },
    },
  })
}
