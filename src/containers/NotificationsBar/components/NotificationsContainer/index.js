import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge, Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import { notificationTypeLabels } from 'containers/NotificationsBar/constants'
import { truncate } from 'lodash'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useState } from 'react'

import useStyles from './styles'

const NotificationsContainer = ({ count, children, fullNotification, handleCloseFullNotification }) => {
  const { t } = useTranslation('accountMenu')
  const classes = useStyles({ notificationType: fullNotification?.notificationType })
  const [isOpen, setIsOpen] = useState(false)
  const title = fullNotification?.headline || fullNotification?.message
  const headTitle = title ? truncate(title, { length: 55 }) : `${t('Notifications')}`

  const toggleDrawer = useCallback(
    (open) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return
      }

      setIsOpen(open)
    },
    []
  )

  const handleBack = useCallback(() => {
    handleCloseFullNotification()
  }, [handleCloseFullNotification])

  return (
    <>
      <Tooltip title={t('Messages')}>
        <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)} size="small">
          <Badge badgeContent={count} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <SwipeableDrawer
        anchor={'right'}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        variant={'temporary'}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box className={classes.drawerInner}>
          {fullNotification && (
            <IconButton onClick={handleBack} className={classes.backIcon} size="large">
              <ArrowBackIcon />
            </IconButton>
          )}

          <Box textAlign="center" display="flex" alignItems="center">
            <Box flex="1">
              {fullNotification && (
                <Typography className={classes.subHeaderType}>
                  {notificationTypeLabels[fullNotification?.notificationType]}
                </Typography>
              )}
              <Typography variant="h6">{headTitle}</Typography>
            </Box>
          </Box>

          <Divider />

          {children}
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default memo(NotificationsContainer)
