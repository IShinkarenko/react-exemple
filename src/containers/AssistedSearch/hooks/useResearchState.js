import { WIZZARD_SEARCH } from 'constant'
import { useReducer } from 'react'

const initialState = {
  activeTab: 0,
  activeStep: 0,
  tags: [],
  text: '',
  searchType: WIZZARD_SEARCH,
  errors: [],
  channelTags: [],
  searching: false,
  results: false,
  expanded: false,
  searchId: null,
  research: false,
  newSearch: false,
}

const researchReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: payload }
    case 'SET_ACTIVE_STEP':
      return { ...state, activeStep: payload }
    case 'SET_CONFIGURATION':
    case 'SET_TAGS':
      return { ...state, tags: payload }
    case 'SET_TEXT':
      return { ...state, text: payload }
    case 'SET_SEARCH_TYPE':
      return { ...state, searchType: payload }
    case 'SET_SEARCHING':
      return { ...state, searching: payload }
    case 'SET_RESULTS':
      return { ...state, results: payload }
    case 'SET_EXPANDED':
      return { ...state, expanded: payload }
    case 'SET_SEARCH_ID':
      return { ...state, searchId: payload }
    case 'SET_CHANNEL_TAGS':
      return { ...state, channelTags: payload }
    case 'SET_RESEARCH':
      return { ...state, research: payload }
    case 'SET_ERRORS':
      return { ...state, errors: payload }
    case 'SET_NEW_SEARCH':
      return { ...state, newSearch: payload }
    default:
      return state
  }
}

export const useResearchState = () => useReducer(researchReducer, initialState)
