import { useReducer } from 'react'

const initialState = {
  expanded: 'personalInfo',
  tagsValues: [],
  personalScore: 0,
  companyScore: 0,
  error: '',
  initialValues: {
    name: '',
    email: '',
    username: '',
    password: '',
    passwordRepeat: '',
    phone_number: '',
    organization: '',
    website: '',
    description: '',
  },
  isUserAgreeWithTerms: false,
  isOpen: false,
}

const completeProfileReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_EXPANDED':
      return { ...state, expanded: payload }
    case 'SET_TAGS_VALUES':
      return { ...state, tagsValues: payload }
    case 'SET_PERSONAL_SCORE':
      return { ...state, personalScore: payload }
    case 'SET_COMPANY_SCORE':
      return { ...state, companyScore: payload }
    case 'SET_ERROR':
      return { ...state, error: payload }
    case 'SET_IS_OPEN':
      return { ...state, isOpen: payload }
    case 'SET_IS_USER_AGREE_WITH_TERMS':
      return { ...state, isUserAgreeWithTerms: payload }
    case 'SET_INITIAL_VALUES':
      return { ...state, initialValues: { ...state.initialValues, ...payload } }

    default:
      return state
  }
}

export const useCompleteProfileState = () => useReducer(completeProfileReducer, initialState)
