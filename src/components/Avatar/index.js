import EditIcon from '@mui/icons-material/Edit'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import cx from 'classnames'
import { DialogPopUp } from 'components'
import { useAppDispatch } from 'hooks/useAppState'
import { useAvatarState } from 'hooks/useAvatarState'
import { useCheckUser } from 'hooks/useCheckUser'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { apiGetFilePreview } from 'services/apiGetFilePreview'
import { capitalizeFirstLetters } from 'utils'
import getCroppedImg from 'utils/cropImg'

import AvatarCropper from './components/AvatarCropper'
import useStyles from './styles'

const AvatarPreview = ({ width = '90px', height = '90px', name, isBorder, className, src, url, handleChange }) => {
  const { t } = useTranslation('avatar')
  const classes = useStyles({ width, height })
  const appStateDispatch = useAppDispatch()
  const [state, dispatch] = useAvatarState()
  const { session } = useCheckUser()
  const { cropResult, preview, croppedAreaPixels, rotation, isDialogOpen, pickNewAvatar, crop, zoom } = state
  const abbreviation = name && capitalizeFirstLetters(name)
  const avatarUrl = src || cropResult

  useEffect(() => {
    if (!avatarUrl) {
      dispatch({ type: 'SET_PREVIEW', payload: null })
    }
  }, [dispatch, avatarUrl])

  useEffect(() => {
    if (src && !preview) {
      dispatch({ type: 'SET_PREVIEW', payload: src })
    }
  }, [dispatch, src, preview])

  const onDrop = useCallback(
    (acceptedFiles) => {
      dispatch({ type: 'SET_PREVIEW', payload: URL.createObjectURL(acceptedFiles[0]) })
      dispatch({ type: 'PICK_NEW_AVATAR', payload: false })
    },
    [dispatch]
  )

  const handleReset = useCallback(() => {
    dispatch({ type: 'SET_ROTATION', payload: 0 })
    dispatch({ type: 'SET_ZOOM', payload: 1 })
  }, [dispatch])

  const postCroppedImage = useCallback(
    async (image) => {
      try {
        if (session && session.accessToken) {
          const data = await apiGetFilePreview(session.accessToken, url, image)
          appStateDispatch({ type: 'SET_LOGO', payload: { avatar: data.url, isAvatarUpdated: true } })
        } else {
          throw 'A current user session and token was not provided.'
        }
      } catch (error) {
        console.error('Error:', error)
      }

      handleReset()
      dispatch({ type: 'SET_IS_DIALOG_OPEN', payload: false })
    },
    [handleReset, session, url, dispatch, appStateDispatch]
  )

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels, rotation)
      const blob = await fetch(croppedImage).then((r) => r.blob())

      dispatch({ type: 'SET_CROP_RESULT', payload: croppedImage })
      postCroppedImage(blob)
      if (handleChange) handleChange({ blob, croppedImage })
    } catch (e) {
      console.error(e)
    }
  }, [dispatch, postCroppedImage, croppedAreaPixels, preview, rotation, handleChange])

  const handlePickNewAvatar = () => {
    dispatch({ type: 'PICK_NEW_AVATAR', payload: true })
    handleReset()
  }

  const handleClose = () => {
    dispatch({ type: 'SET_IS_DIALOG_OPEN', payload: false })
    handleReset()
    dispatch({ type: 'PICK_NEW_AVATAR', payload: false })
  }

  const handleOpen = () => {
    dispatch({ type: 'SET_IS_DIALOG_OPEN', payload: true })
  }

  const handleDeleteAvatar = () => {
    dispatch({ type: 'SET_IS_DIALOG_OPEN', payload: false })
    dispatch({ type: 'SET_CROP_RESULT', payload: null })
    appStateDispatch({ type: 'SET_LOGO', payload: { avatar: '', isAvatarUpdated: true } })

    if (handleChange) handleChange({ blob: null, croppedImage: null })
  }

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Grid container>
      <Grid item xs={6}>
        {avatarUrl ? (
          <Box className={classes.avatarContainer}>
            <Avatar
              alt="avatar"
              src={avatarUrl}
              className={cx(classes.avatar, className, { [classes.border]: isBorder })}
            >
              {abbreviation}
            </Avatar>

            <Box className={classes.iconContainer} onClick={handleOpen}>
              <EditIcon />
            </Box>
          </Box>
        ) : (
          <Avatar alt="avatar" className={classes.avatar} onClick={handleOpen}>
            {abbreviation}

            <Box className={classes.iconContainerEmpty}>
              <PhotoCameraIcon />
            </Box>
          </Avatar>
        )}
      </Grid>

      <DialogPopUp
        isOpenModal={isDialogOpen}
        title={pickNewAvatar ? t('Upload Avatar') : t('Edit Avatar')}
        closeModal={handleClose}
      >
        {!pickNewAvatar && !!preview ? (
          <AvatarCropper
            preview={preview}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            dispatch={dispatch}
            showCroppedImage={showCroppedImage}
            handleDeleteAvatar={handleDeleteAvatar}
            handlePickNewAvatar={handlePickNewAvatar}
          />
        ) : (
          <Box className={classes.dropzoneWrapper}>
            <Box className={classes.dropzone} {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="h4" align="center">
                {t('Drag and drop some files here, or click to select files')}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogPopUp>
    </Grid>
  )
}

export default memo(AvatarPreview)
