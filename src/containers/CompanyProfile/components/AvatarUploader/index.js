import EditIcon from '@mui/icons-material/Edit'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import { Avatar, Box, Grid } from '@mui/material'
import clsx from 'clsx'
import { UploadImageDialog } from 'components'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'
import { capitalizeFirstLetters, getLogoUploadUrl } from 'utils'

import useStyles from './styles'

const AvatarUploader = ({ src, name, handleUpdate, loading, handleStartLoading }) => {
  const classes = useStyles()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { companyId } = router.query
  const abbreviation = capitalizeFirstLetters(name)
  const logoUploadUrl = getLogoUploadUrl({ companyId })

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])
  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          {src ? (
            <Box className={classes.avatarContainer}>
              <Avatar alt="avatar" src={src} className={clsx(classes.avatar)}>
                {abbreviation}
              </Avatar>

              <Box className={classes.iconContainer} onClick={handleOpen}>
                <EditIcon />
              </Box>
            </Box>
          ) : (
            <Avatar alt="avatar" className={classes.avatar} onClick={handleOpen}>
              {abbreviation}

              <Box className={classes.iconContainer}>
                <PhotoCameraIcon />
              </Box>
            </Avatar>
          )}
        </Grid>
      </Grid>

      <UploadImageDialog
        src={src}
        isOpen={isOpen}
        loading={loading}
        url={logoUploadUrl}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        handleStartLoading={handleStartLoading}
      />
    </>
  )
}

export default memo(AvatarUploader)
