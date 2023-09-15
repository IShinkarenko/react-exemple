import { GET_COMPANY_DEFINITIONS } from 'api/hooks/queries/useCompanyDefinitions/useCompanyDefinitions.gql'

export const updateCompanyDefinitionsCache = ({ companyId, cache, data: { createCompanyDefinition } }) => {
  const { getCompany } = cache.readQuery({
    query: GET_COMPANY_DEFINITIONS,
    variables: {
      id: companyId,
    },
  })

  const newDefinitions = [...getCompany?.definitions?.items, createCompanyDefinition]

  cache.writeQuery({
    query: GET_COMPANY_DEFINITIONS,
    variables: {
      id: companyId,
    },
    data: {
      getCompany: { ...getCompany, definitions: { ...getCompany.definitions, items: newDefinitions } },
    },
  })
}
