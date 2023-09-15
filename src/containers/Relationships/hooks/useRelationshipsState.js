import { useReducer } from 'react'

const initialState = {
  activeTab: 0,
  isCSVImport: false,
  filter: {
    searchPhrase: '',
    types: [],
    sources: [],
    standardTags: [],
  },
  nextToken: undefined,
  nextNextToken: undefined,
  previousTokens: [],
  selectionModel: [],
}

const relationshipsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: payload }
    case 'SET_IS_CSV_IMPORT':
      return { ...state, isCSVImport: payload }
    case 'SET_FILTER':
      return { ...state, filter: { ...state.filter, ...payload } }
    case 'SET_NEXT_TOKEN':
      return { ...state, nextToken: payload }
    case 'SET_NEXT_NEXT_TOKEN':
      return { ...state, nextNextToken: payload }
    case 'SET_PREVIOUS_TOKENS':
      return { ...state, previousTokens: payload }
    case 'SET_SELECTION_MODEL':
      return { ...state, selectionModel: payload }

    default:
      return state
  }
}

export const useRelationshipsState = () => useReducer(relationshipsReducer, initialState)
