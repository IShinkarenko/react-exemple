import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Badge, Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material'
import clsx from 'clsx'
import { OptionsMenu } from 'components'
import { notificationTypeLabels } from 'containers/NotificationsBar/constants'
import { truncate } from 'lodash'
import moment from 'moment'
import React, { memo, useCallback, useState } from 'react'
import { animated, useSpring } from 'react-spring'

import useStyles from './styles'

const Notification = ({
  id,
  options,
  isNew,
  message,
  notificationType,
  creationTimestamp,
  headline,
  metaData,
  handleShowFullNotification,
}) => {
  const classes = useStyles({ notificationType })
  const [showOptions, setShowOptions] = useState(false)

  const AnimatedOptions = animated(Box)
  const AnimatedIconButton = animated(IconButton)
  const timeProps = useSpring({ opacity: showOptions ? 0 : 1 })
  const optionsProps = useSpring({ opacity: showOptions ? 1 : 0 })
  const iconProps = useSpring({ opacity: showOptions ? 1 : 0, right: showOptions ? -14 : -7 })

  const claimedMetaData = JSON.parse(metaData)
  const time = moment(creationTimestamp).format('MMM Do LT')
  const messagePreview = message.length > 140 ? truncate(message, { length: 140 }) : message
  const isNotificationActive = !claimedMetaData?.status

  const onMouseEnterHandler = useCallback(() => {
    isNotificationActive && setShowOptions(true)
  }, [isNotificationActive])

  const onMouseLeaveHandler = useCallback(() => {
    setShowOptions(false)
  }, [])

  const handleClick = useCallback(() => {
    handleShowFullNotification(id)
  }, [handleShowFullNotification, id])

  return (
    <>
      <Badge
        variant="dot"
        color="primary"
        invisible={!isNew}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        className={classes.badgeWrapper}
      >
        <Card
          variant="outlined"
          className={classes.notification}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        >
          <CardHeader
            title={headline}
            subheader={
              <>
                <Typography className={classes.subheaderType}>{notificationTypeLabels[notificationType]}</Typography>

                {!isNotificationActive && (
                  <Typography
                    variant="OVERLINE"
                    className={clsx(classes.notificationStatus, classes[claimedMetaData?.status])}
                  >
                    {claimedMetaData?.status}
                  </Typography>
                )}
              </>
            }
            action={
              <>
                <animated.span style={timeProps}>{time}</animated.span>

                {isNotificationActive && (
                  <AnimatedIconButton className={classes.showArrow} style={iconProps} onClick={handleClick}>
                    <ArrowForwardIosIcon />
                  </AnimatedIconButton>
                )}
              </>
            }
            classes={{
              root: classes.root,
              title: classes.title,
              content: classes.content,
              subheader: classes.subheader,
              action: classes.action,
            }}
          />

          <CardContent
            classes={{
              root: classes.messageContent,
            }}
          >
            <Typography variant="body2" color="textSecondary" component="p" className={classes.contentInner}>
              {messagePreview}
            </Typography>
          </CardContent>

          {isNotificationActive && (
            <AnimatedOptions className={classes.options} style={optionsProps}>
              <OptionsMenu
                title={
                  <Typography className={classes.optionsText}>
                    Options
                    <ExpandMoreIcon />
                  </Typography>
                }
                actions={options}
              />
            </AnimatedOptions>
          )}
        </Card>
      </Badge>
    </>
  )
}

export default memo(Notification)
