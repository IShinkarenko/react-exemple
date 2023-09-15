import MailIcon from '@mui/icons-material/Mail'
import ShareIcon from '@mui/icons-material/Share'
import WorkIcon from '@mui/icons-material/Work'
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import clsx from 'clsx'
import { DialogPopUp, Share } from 'components'
import { CONNECTED } from 'constant'
import PublicCompanyView from 'containers/PublicCompanyView'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo, useState } from 'react'
import { capitalizeFirstLetters } from 'utils'

import useStyles from './styles'

const ConnectionItem = ({ description, name, status, location, logoUrl, expandigoCompanyId }) => {
  const { t } = useTranslation('channels')

  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const isConnected = status === CONNECTED

  const handleDialogClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false)
    } else {
      setIsPublic(false)
    }
  }, [isOpen])

  const handleOpenProfileClick = useCallback(() => {
    setIsPublic(true)
  }, [])

  const renderStatus = useMemo(
    () => ({
      Connected: t('Connected'),
      ConnectionPending: t('Pending'),
      ConnectionRejected: t('Rejected'),
      Disconnected: t('Disconnected'),
      Following: t('Following'),
    }),
    [t]
  )

  return (
    <>
      <Grid item xs={2} sm={4} md={4}>
        <Card variant="outlined" className={classes.card}>
          <CardHeader
            subheader={<span className={clsx(classes.status, classes[status])}>{renderStatus[status]}</span>}
            classes={{ root: classes.cardHeaderRoot, subheader: classes.subheader }}
          />

          <CardContent className={classes.cardContent}>
            <Avatar className={classes.avatar} src={logoUrl} onClick={handleOpenProfileClick}>
              {capitalizeFirstLetters(name)}
            </Avatar>

            <Typography className={classes.location}>{location}</Typography>

            <Typography className={classes.name} onClick={handleOpenProfileClick}>
              {name}
            </Typography>

            <Typography className={classes.description}>{description}</Typography>
          </CardContent>

          <CardActions>
            <IconButton>
              <WorkIcon color="inherit" className={classes.action} />
            </IconButton>

            {isConnected && (
              <IconButton>
                <MailIcon color="inherit" className={classes.action} />
              </IconButton>
            )}

            <Share
              id={expandigoCompanyId}
              className={classes.action}
              icon={
                <IconButton>
                  <ShareIcon color="inherit" className={classes.action} />
                </IconButton>
              }
            />
          </CardActions>
        </Card>
      </Grid>

      <DialogPopUp
        isOpenModal={isPublic}
        closeModal={handleDialogClose}
        maxWidth={'lg'}
        isButton
        dialogContentClasses={classes.dialogContent}
      >
        <PublicCompanyView companyId={expandigoCompanyId} />
      </DialogPopUp>
    </>
  )
}

export default ConnectionItem
