import { GET_COMPANY_RELATIONSHIP_NOTES } from 'api/hooks/queries/useCompanyRealtionshipNotes/useCompanyRealtionshipNotes.gql'

export const updateRelationshipNoteCache = ({ relationshipId, cache, data: { createRelationshipNote } }) => {
  const { getCompanyRelationship } = cache.readQuery({
    query: GET_COMPANY_RELATIONSHIP_NOTES,
    variables: {
      id: relationshipId,
    },
  })

  const newRelationshipNotes = [createRelationshipNote, ...getCompanyRelationship?.notes?.items]

  cache.writeQuery({
    query: GET_COMPANY_RELATIONSHIP_NOTES,
    variables: {
      id: relationshipId,
    },
    data: {
      getCompanyRelationship: {
        ...getCompanyRelationship,
        notes: { ...getCompanyRelationship?.notes, items: newRelationshipNotes },
      },
    },
  })
}
