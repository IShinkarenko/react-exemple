import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton } from '@mui/material'
import { UploadImageDialog } from 'components'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'
import { getLogoUploadUrl } from 'utils'

import useStyles from './styles'

const CompanyBanner = ({ src, handleChange, loading, handleStartLoading }) => {
  const classes = useStyles()
  const router = useRouter()
  const { companyId } = router.query
  const [isOpen, setIsOpen] = useState(false)
  const bannerUploadUrl = getLogoUploadUrl({ companyId, isBanner: true })

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleUpdate = useCallback(
    ({ imageUrl }) => {
      handleChange({ name: 'bannerUrl', value: imageUrl })
    },
    [handleChange]
  )

  return (
    <>
      <Box
        className={classes.companyBackground}
        style={{
          backgroundImage: `url(${src})`,
        }}
      >
        <IconButton className={classes.editIcon} onClick={handleOpen} size="large">
          <EditIcon />
        </IconButton>
      </Box>

      <UploadImageDialog
        src={src}
        aspect={3 / 1}
        isOpen={isOpen}
        loading={loading}
        cropShape={'rect'}
        url={bannerUploadUrl}
        handleClose={handleClose}
        handleUpdate={handleUpdate}
        handleStartLoading={handleStartLoading}
      />
    </>
  )
}

export default memo(CompanyBanner)
