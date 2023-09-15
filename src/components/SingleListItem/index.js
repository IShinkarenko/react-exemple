import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React, { memo } from 'react'

import useStyles from './styles'

const SingleListItem = ({
  itemText,
  itemIcon,
  handleClick,
  disableTypography,
  className,
  disabled = false,
  button = true,
}) => {
  const classes = useStyles()

  return (
    <ListItem
      button={button}
      onClick={handleClick}
      className={className}
      disabled={disabled}
      classes={{
        root: classes.root,
      }}
    >
      {itemIcon && <ListItemIcon>{itemIcon}</ListItemIcon>}
      <ListItemText primary={itemText} disableTypography={disableTypography} />
    </ListItem>
  )
}

export default memo(SingleListItem)
