import { useReducer } from 'react'

const initialState = {
  company: '',
  channel: '',
  bufferCompany: '',
  bufferChannel: '',
  preferenceType: '',
  isOpen: false,
  isUpdated: false,
}

const preferenceReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_COMPANY':
      return { ...state, company: payload }
    case 'SET_CHANNEL':
      return { ...state, channel: payload }
    case 'SET_BUFFER_COMPANY':
      return { ...state, bufferCompany: payload }
    case 'SET_BUFFER_CHANNEL':
      return { ...state, bufferChannel: payload }
    case 'SET_PREFERENCE_TYPE':
      return { ...state, preferenceType: payload }
    case 'SET_IS_OPEN':
      return { ...state, isOpen: payload }
    case 'SET_IS_UPDATED':
      return { ...state, isUpdated: payload }
    default:
      return state
  }
}

export const usePreferenceState = () => useReducer(preferenceReducer, initialState)
