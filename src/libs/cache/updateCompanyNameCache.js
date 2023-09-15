import { GET_COMPANIES } from 'api/hooks/queries/useCompanies/useCompanies.gql'

export const updateCompanyNameCache = ({ userId, cache, data: { updateCompany } }) => {
  const { getUser } = cache.readQuery({
    query: GET_COMPANIES,
    variables: {
      id: userId,
    },
  })

  const companies = getUser?.companies?.items
  const companyIndex = companies.findIndex(({ companyId }) => companyId === updateCompany.id)
  const updatedCompany = { ...companies[companyIndex], companyName: updateCompany.name }
  const updatedCompanies = [...companies.slice(0, companyIndex), updatedCompany, ...companies.slice(companyIndex + 1)]

  cache.writeQuery({
    query: GET_COMPANIES,
    variables: {
      id: userId,
    },
    data: {
      getUser: { ...getUser, companies: { ...getUser.companies, items: updatedCompanies } },
    },
  })
}
