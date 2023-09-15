import { useReducer } from 'react'

const initialState = {
  name: '',
  logo: {
    blob: null,
    croppedImage: null,
  },
  description: '',
  errors: null,
  emails: [''],
}

const newCompanyReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_NAME':
      return { ...state, name: payload }
    case 'SET_LOGO':
      return { ...state, logo: payload }
    case 'SET_MEMBERS':
      return { ...state, members: payload }
    case 'SET_DESCRIPTION':
      return { ...state, description: payload }
    case 'SET_ERRORS':
      return { ...state, errors: payload }
    case 'SET_EMAILS':
      return { ...state, emails: payload }
    default:
      return state
  }
}

export const useNewCompanyState = () => useReducer(newCompanyReducer, initialState)
