import { useReducer } from 'react'

const initialState = {
  preview: null,
  cropResult: null,
  isDialogOpen: false,
  isLoaded: false,
  pickNewAvatar: false,
  crop: { x: 0, y: 0 },
  rotation: 0,
  zoom: 1,
  croppedAreaPixels: null,
}

const avatarReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_PREVIEW':
      return { ...state, preview: payload }
    case 'SET_CROP_RESULT':
      return { ...state, cropResult: payload }
    case 'SET_IS_DIALOG_OPEN':
      return { ...state, isDialogOpen: payload }
    case 'SET_IS_LOADED':
      return { ...state, isLoaded: payload }
    case 'SET_CROP':
      return { ...state, crop: payload }
    case 'SET_ROTATION':
      return { ...state, rotation: payload }
    case 'SET_ZOOM':
      return { ...state, zoom: payload }
    case 'SET_CROPPED_AREA_PIXELS':
      return { ...state, croppedAreaPixels: payload }
    case 'PICK_NEW_AVATAR':
      return { ...state, pickNewAvatar: payload }
    default:
      return state
  }
}

export const useAvatarState = () => useReducer(avatarReducer, initialState)
