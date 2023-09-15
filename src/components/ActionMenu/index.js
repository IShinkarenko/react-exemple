import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, List, Tooltip } from '@mui/material'
import clsx from 'clsx'
import { Fade, SingleListItem } from 'components'
import { useTranslation } from 'next-i18next'
import React from 'react'

import useStyles from './styles'

const ActionMenu = ({ actions, className, classNameOptions }) => {
  const { t } = useTranslation('common')

  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const onHandleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    anchorEl ? setAnchorEl(null) : setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Fade
      isOpen={!!anchorEl}
      closeMenu={handleClose}
      title={
        <Tooltip title={t('Options')}>
          <IconButton
            className={clsx(classes.actionButtonIcon, className)}
            color="inherit"
            onClick={onHandleClick}
            size="small"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      }
    >
      <List disablePadding className={classNameOptions}>
        {actions.map(({ title, icon, handleClick }) => {
          const onListItemClick = (event) => {
            event.preventDefault()
            event.stopPropagation()

            handleClose()
            handleClick()
          }

          return (
            <SingleListItem
              key={title}
              itemText={title}
              itemIcon={icon}
              handleClick={onListItemClick}
              className={classes.options}
            />
          )
        })}
      </List>
    </Fade>
  )
}

export default ActionMenu
