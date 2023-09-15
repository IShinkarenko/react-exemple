import { gql } from '@apollo/client'

import { relationshipFragment } from './../../fragments'

export const DELETE_BATCH_COMPANY_RELATIONSHIP = gql`
  mutation batchDeleteCompanyRelationship($ids: [ID], $filter: ModelCompanyRelationshipFastFilterInput) {
    batchDeleteCompanyRelationship(ids: $ids, filter: $filter) {
      ...RelationshipFragment
    }
  }
  ${relationshipFragment}
`
