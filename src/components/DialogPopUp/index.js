import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material/'
import SectionLoader from 'components/SectionLoader'
import dynamic from 'next/dynamic'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const DynamicDialog = dynamic(() => import('@mui/material/').then((mod) => mod.Dialog))

const DialogPopUp = ({
  title,
  maxWidth,
  children,
  closeModal,
  cancelTitle,
  isOpenModal,
  description,
  handleAccept,
  successTitle,
  isButton = false,
  dialogContentClasses,
  dialogActions,
  fullWidth = true,
  loading,
  ...rest
}) => {
  const classes = useStyles()

  const handleCloseModal = useCallback(
    (event) => {
      event.stopPropagation()
      closeModal(false)
    },
    [closeModal]
  )

  return (
    <DynamicDialog
      {...rest}
      onClose={handleCloseModal}
      aria-labelledby="dialog-title"
      open={isOpenModal}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      {title && (
        <DialogTitle classes={{ root: classes.dialogTitle }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="span">
              {title}
            </Typography>
            <IconButton aria-label="close" color="inherit" onClick={handleCloseModal} size="large">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
      )}

      {isButton && (
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={handleCloseModal}
          className={classes.closeButton}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      )}

      {loading ? (
        <SectionLoader sx={{ pb: '24px' }} />
      ) : (
        <DialogContent className={dialogContentClasses} classes={{ root: classes.content }}>
          {description && (
            <Box mb={2}>
              <Typography variant="body2" component="div">
                {description}
              </Typography>
            </Box>
          )}

          {children}
        </DialogContent>
      )}

      {dialogActions && <DialogActions classes={{ root: classes.root }}>{dialogActions}</DialogActions>}

      {!dialogActions && (cancelTitle || successTitle) && (
        <DialogActions classes={{ root: classes.root }}>
          {cancelTitle && (
            <Button onClick={handleCloseModal} variant="outlined">
              {cancelTitle}
            </Button>
          )}
          {successTitle && (
            <Button onClick={handleAccept} variant="contained">
              {successTitle}
            </Button>
          )}
        </DialogActions>
      )}
    </DynamicDialog>
  )
}

export default memo(DialogPopUp)
