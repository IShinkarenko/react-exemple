import { Box, Typography } from '@mui/material'
import DialogPopUp from 'components/DialogPopUp'
import { useCheckUser } from 'hooks/useCheckUser'
import { useUploadImageState } from 'hooks/useUploadImageState'
import React, { memo, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { apiGetFilePreview } from 'services/apiGetFilePreview'
import getCroppedImg from 'utils/cropImg'

import ImageCropper from './components/ImageCropper'
import useStyles from './styles'

const UploadImageDialog = ({
  isOpen,
  handleClose,
  url,
  src,
  handleUpdate,
  aspect,
  objectFit,
  cropShape,
  loading,
  handleStartLoading,
}) => {
  const classes = useStyles()
  const [state, dispatch] = useUploadImageState()
  const { session } = useCheckUser()
  const { pickNewImage, preview, crop, rotation, zoom, croppedAreaPixels, cropResult, dropPreview } = state
  const imageUrl = src || cropResult

  useEffect(() => {
    if (dropPreview) {
      dispatch({ type: 'SET_PREVIEW', payload: dropPreview })
    }
  }, [dispatch, dropPreview])

  useEffect(() => {
    if (!imageUrl) {
      dispatch({ type: 'SET_PREVIEW', payload: null })
    }
  }, [dispatch, imageUrl])

  useEffect(() => {
    if (src && !dropPreview) {
      dispatch({ type: 'SET_PREVIEW', payload: src })
    }
  }, [dispatch, src, preview, dropPreview])

  const handleReset = useCallback(() => {
    dispatch({ type: 'SET_ROTATION', payload: 0 })
    dispatch({ type: 'SET_ZOOM', payload: 1 })
  }, [dispatch])

  const handleDialogClose = useCallback(() => {
    handleReset()
    dispatch({ type: 'SET_PREVIEW', payload: null })
    dispatch({ type: 'SET_DROP_PREVIEW', payload: null })
    dispatch({ type: 'PICK_NEW_IMAGE', payload: false })
    dispatch({ type: 'SET_CROP_RESULT', payload: null })
    handleClose()
  }, [handleClose, handleReset, dispatch])

  const postCroppedImage = useCallback(
    async (image) => {
      try {
        if (session && session.accessToken) {
          const data = await apiGetFilePreview(session.accessToken, url, image)
          handleUpdate({ imageUrl: data.url })
        } else {
          throw 'A current user session and token was not provided.'
        }
      } catch (error) {
        console.error('Error:', error)
      }

      if (!loading) {
        handleDialogClose()
      }
    },
    [url, session, handleUpdate, loading, handleDialogClose]
  )

  const showCroppedImage = useCallback(async () => {
    handleStartLoading()

    try {
      const croppedImage = await getCroppedImg(preview, croppedAreaPixels, rotation)
      const blob = await fetch(croppedImage).then((r) => r.blob())

      dispatch({ type: 'SET_CROP_RESULT', payload: croppedImage })
      postCroppedImage(blob)
    } catch (e) {
      console.error(e)
    }
  }, [dispatch, postCroppedImage, croppedAreaPixels, preview, rotation, handleStartLoading])

  const handleDeleteAvatar = useCallback(() => {
    handleClose()
    dispatch({ type: 'SET_CROP_RESULT', payload: null })
    handleUpdate({ imageUrl: '' })
  }, [handleClose, dispatch, handleUpdate])

  const handlePickNewAvatar = useCallback(() => {
    dispatch({ type: 'SET_DROP_PREVIEW', payload: null })

    dispatch({ type: 'PICK_NEW_IMAGE', payload: true })
    handleReset()
  }, [dispatch, handleReset])

  const onDrop = useCallback(
    (acceptedFiles) => {
      dispatch({ type: 'SET_DROP_PREVIEW', payload: URL.createObjectURL(acceptedFiles[0]) })
      dispatch({ type: 'PICK_NEW_IMAGE', payload: false })
    },
    [dispatch]
  )
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <DialogPopUp
      isOpenModal={isOpen}
      title={pickNewImage ? 'Upload Image' : 'Edit Image'}
      closeModal={handleDialogClose}
      dialogContentClasses={classes.uploadDialog}
    >
      {!pickNewImage && !!preview ? (
        <ImageCropper
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          preview={preview}
          loading={loading}
          rotation={rotation}
          dispatch={dispatch}
          cropShape={cropShape}
          objectFit={objectFit}
          showCroppedImage={showCroppedImage}
          handleDeleteAvatar={handleDeleteAvatar}
          handlePickNewAvatar={handlePickNewAvatar}
        />
      ) : (
        <Box className={classes.dropzoneWrapper}>
          <Box className={classes.dropzone} {...getRootProps()}>
            <input {...getInputProps()} />
            <Typography variant="h4" align="center">
              {'Drag and drop some files here, or click to select files'}
            </Typography>
          </Box>
        </Box>
      )}
    </DialogPopUp>
  )
}

export default memo(UploadImageDialog)
