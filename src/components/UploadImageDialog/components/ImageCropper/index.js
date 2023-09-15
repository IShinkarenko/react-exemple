import { Box, CircularProgress, Slider, Typography } from '@mui/material'
import { BaseButton } from 'components'
import React, { memo, useCallback } from 'react'
import Cropper from 'react-easy-crop'

import useStyles from './styles'

const ImageCropper = ({
  crop,
  zoom,
  preview,
  dispatch,
  rotation,
  showCroppedImage,
  handleDeleteAvatar,
  handlePickNewAvatar,
  aspect = 1,
  objectFit = 'contain',
  cropShape = 'round',
  loading,
}) => {
  const classes = useStyles()

  const onCropChange = useCallback(
    (data) => {
      dispatch({ type: 'SET_CROP', payload: data })
    },
    [dispatch]
  )

  const onRotationChange = useCallback(
    (data) => {
      dispatch({ type: 'SET_ROTATION', payload: data })
    },
    [dispatch]
  )

  const onZoomChange = useCallback(
    (data) => {
      dispatch({ type: 'SET_ZOOM', payload: data })
    },
    [dispatch]
  )

  const onCropComplete = useCallback(
    (croppedArea, croppedAreaPixels) => {
      dispatch({ type: 'SET_CROPPED_AREA_PIXELS', payload: croppedAreaPixels })
    },
    [dispatch]
  )

  return (
    <>
      <Box className={classes.cropWrapper}>
        <Cropper
          image={preview}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={aspect}
          objectFit={objectFit}
          cropShape={cropShape}
          showGrid={false}
          onCropChange={onCropChange}
          onRotationChange={onRotationChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </Box>

      <Box className={classes.slidersWrapper}>
        <Box>
          <Typography id="zoom">Zoom</Typography>
          <Box pl={1}>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              label="Zoom"
              aria-labelledby="zoom"
              classes={{ container: classes.slider }}
              onChange={(e, zoom) => onZoomChange(zoom)}
            />
          </Box>
        </Box>

        <Box>
          <Typography id="rotation">Rotate</Typography>
          <Box pl={1}>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotation"
              classes={{ container: classes.slider }}
              onChange={(e, rotation) => onRotationChange(rotation)}
            />
          </Box>
        </Box>
      </Box>

      <Box className={classes.uploadButtons}>
        <BaseButton
          onClick={handleDeleteAvatar}
          color="primary"
          variant="text"
          title={'Delete photo'}
          className={classes.deleteButton}
          disabled={loading}
        />

        <Box display="flex" justifyContent="flex-end">
          <BaseButton onClick={handlePickNewAvatar} variant="outlined" title={'Change photo'} disabled={loading} />
          <Box position="relative" ml={2}>
            <BaseButton onClick={showCroppedImage} color="primary" title={'Save'} disabled={loading} />
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default memo(ImageCropper)
