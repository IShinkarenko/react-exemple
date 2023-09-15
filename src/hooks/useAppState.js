import { SIGN_IN } from 'constant'
import { createContext, useContext, useReducer } from 'react'

const AppStateContext = createContext()
const AppDispatchContext = createContext()

const initialState = {
  user: null,
  activeCompanyId: null,
  username: '',
  authError: null,
  authFormType: SIGN_IN,
  activePageTab: 0,
  activeChannelTab: 0,
  lastVisitedChannelLink: '',
  signInLoading: false,
  signOutLoading: false,
  rootLoading: true,
  tokenRefreshed: false,
  logo: {
    avatar: null,
    isAvatarUpdated: false,
  },
}

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_USER':
      return { ...state, user: payload }
    case 'SET_ACTIVE_COMPANY_ID':
      return { ...state, activeCompanyId: payload }
    case 'SET_USERNAME':
      return { ...state, username: payload }
    case 'SET_AUTH_ERROR':
      return { ...state, authError: payload }
    case 'SET_SIGN_IN_LOADING':
      return { ...state, signInLoading: payload }
    case 'SET_SIGN_OUT_LOADING':
      return { ...state, signOutLoading: payload }
    case 'SET_ROOT_LOADING':
      return { ...state, rootLoading: payload }
    case 'SET_AUTH_FORM_TYPE':
      return { ...state, authFormType: payload }
    case 'SET_LOGO':
      return { ...state, logo: payload }
    case 'SET_IS_AVATAR_UPDATED':
      return { ...state, isAvatarUpdated: payload }
    case 'SET_PAGE_TAB':
      return { ...state, activePageTab: payload }
    case 'SET_TOKEN_REFRESHED':
      return { ...state, tokenRefreshed: payload }
    case 'SET_CHANNEL_TAB':
      return { ...state, activeChannelTab: payload }
    case 'SET_CHANNEL_LINK':
      return { ...state, lastVisitedChannelLink: payload }

    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
    </AppDispatchContext.Provider>
  )
}
export const useAppState = () => useContext(AppStateContext)
export const useAppDispatch = () => useContext(AppDispatchContext)
