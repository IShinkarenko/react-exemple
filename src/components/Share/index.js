import ShareIcon from '@mui/icons-material/Share'
import { Box, Typography } from '@mui/material'
import clsx from 'clsx'
import { CopyToClipboardWrapper, DialogPopUp } from 'components'
import { baseUrl } from 'constant'
import { useTranslation } from 'next-i18next'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'next-share'
import React, { memo, useCallback, useState } from 'react'

import useStyles from './styles'

const Share = ({ title, icon, className, id }) => {
  const { t } = useTranslation('common')
  const classes = useStyles()

  const [isOpen, setIsOpen] = useState(false)
  const url = `${baseUrl}/public-profile/${id}`

  const handleShareClick = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const handleDialogClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <Box>
      <Typography variant="caption" onClick={handleShareClick} className={clsx(classes.shareIcon, className)}>
        {icon ? icon : <ShareIcon color="primary" />}

        {title && <span>{'Share'}</span>}
      </Typography>

      <DialogPopUp
        isOpenModal={isOpen}
        title={t('Thanks for sharing!')}
        description={t('Choose your preferred method below.')}
        closeModal={handleDialogClose}
        maxWidth={'xs'}
      >
        <Box className={classes.socialLinks}>
          <LinkedinShareButton url={url} hashtag={'#expandigo'}>
            <Box className={classes.socialItem}>
              <LinkedinIcon size={32} round />
              <Typography>{t('LinkedIn')}</Typography>
            </Box>
          </LinkedinShareButton>

          <TwitterShareButton url={url} hashtag={'#expandigo'}>
            <Box className={classes.socialItem}>
              <TwitterIcon size={32} round />
              <Typography>{t('Twitter')}</Typography>
            </Box>
          </TwitterShareButton>

          <FacebookShareButton url={url} hashtag={'#expandigo'}>
            <Box className={classes.socialItem}>
              <FacebookIcon size={32} round />
              <Typography>{t('Facebook')}</Typography>
            </Box>
          </FacebookShareButton>

          <EmailShareButton url={url} hashtag={'#expandigo'}>
            <Box className={classes.socialItem}>
              <EmailIcon size={32} round />
              <Typography>{t('Email')}</Typography>
            </Box>
          </EmailShareButton>
        </Box>

        <Box className={classes.link}>
          <Box className={classes.linkWrap}>
            <CopyToClipboardWrapper value={url}>
              <Box className={classes.copyLink}>{url}</Box>
            </CopyToClipboardWrapper>
          </Box>
        </Box>
      </DialogPopUp>
    </Box>
  )
}

export default memo(Share)
