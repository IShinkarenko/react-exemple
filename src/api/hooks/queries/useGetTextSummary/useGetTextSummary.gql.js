import { gql } from '@apollo/client'

export const GET_TEXT_SUMMARY = gql`
  query getTextSummary($text: String!) {
    getTextSummary(text: $text)
  }
`
