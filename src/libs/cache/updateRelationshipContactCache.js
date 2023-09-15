import { GET_COMPANY_RELATIONSHIP_KEY_CONTACTS } from 'api/hooks/queries/useCompanyRealtionshipKeyContacts/useCompanyRealtionshipKeyContacts.gql'

export const updateRelationshipContactCache = ({ relationshipId, cache, data: { createRelationshipContact } }) => {
  const { getCompanyRelationship } = cache.readQuery({
    query: GET_COMPANY_RELATIONSHIP_KEY_CONTACTS,
    variables: {
      id: relationshipId,
    },
  })

  const newRelationshipContacts = [...getCompanyRelationship?.contacts?.items, createRelationshipContact]

  cache.writeQuery({
    query: GET_COMPANY_RELATIONSHIP_KEY_CONTACTS,
    variables: {
      id: relationshipId,
    },
    data: {
      getCompanyRelationship: {
        ...getCompanyRelationship,
        contacts: { ...getCompanyRelationship?.contacts, items: newRelationshipContacts },
      },
    },
  })
}
