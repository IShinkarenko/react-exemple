import { GET_COMPANIES } from 'api/hooks/queries/useCompanies/useCompanies.gql'

export const updateCompaniesCache = ({ userId, cache, data: { setupNewCompany } }) => {
  const { getUser } = cache.readQuery({
    query: GET_COMPANIES,
    variables: {
      id: userId,
    },
  })

  const newCompanies = [...getUser?.companies?.items, setupNewCompany]

  cache.writeQuery({
    query: GET_COMPANIES,
    variables: {
      id: userId,
    },
    data: {
      getUser: { ...getUser, companies: { ...getUser.companies, items: newCompanies } },
    },
  })
}
