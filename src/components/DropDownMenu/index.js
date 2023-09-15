import { Menu } from '@mui/material'
import clsx from 'clsx'
import React, { memo } from 'react'

import useStyles from './styles'

const DropDownMenu = ({ children, anchorEl, handleClose, horizontal = 'center', className }) => {
  const classes = useStyles()

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: horizontal,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={!!anchorEl}
        onClose={handleClose}
        classes={{ list: clsx(classes.menu, className) }}
        aria-hidden="true"
      >
        {children}
      </Menu>
    </>
  )
}

export default memo(DropDownMenu)
