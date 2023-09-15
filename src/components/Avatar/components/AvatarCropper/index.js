import { Box, Slider, Typography } from '@mui/material'
import { BaseButton } from 'components'
import React, { useCallback } from 'react'
import Cropper from 'react-easy-crop'

import useStyles from './styles'

const AvatarCropper = ({
  crop,
  zoom,
  preview,
  dispatch,
  rotation,
  showCroppedImage,
  handleDeleteAvatar,
  handlePickNewAvatar,
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
    <Box className={classes.cropWrapper}>
      <Cropper
        image={preview}
        crop={crop}
        rotation={rotation}
        zoom={zoom}
        aspect={3 / 2}
        style={{ containerStyle: { padding: '20px', position: 'relative', width: '100%', height: '100%' } }}
        disableAutomaticStylesInjection
        onCropChange={onCropChange}
        onRotationChange={onRotationChange}
        onCropComplete={onCropComplete}
        onZoomChange={onZoomChange}
      />

      <Box mt={2} mb={1}>
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

      <Box mt={1} mb={1}>
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

      <Box display="flex" alignItems="center" mt={2} justifyContent="space-between">
        <BaseButton
          onClick={handleDeleteAvatar}
          color="primary"
          variant="text"
          title={'Delete photo'}
          className={classes.deleteButton}
        />

        <Box display="flex" justifyContent="flex-end">
          <BaseButton onClick={handlePickNewAvatar} variant="outlined" title={'Change photo'} />
          <BaseButton onClick={showCroppedImage} color="primary" title={'Save'} />
        </Box>
      </Box>
    </Box>
  )
}

export default AvatarCropper
