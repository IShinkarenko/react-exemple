import { Box, ClickAwayListener, Fade, Paper } from '@mui/material'
import clsx from 'clsx'
import React, { memo } from 'react'

import { useStyles } from './styles.js'

const FadeMenu = ({ title, isOpen, closeMenu, children, menuProps, className, ...props }) => {
  const classes = useStyles()
  const menuRef = React.useRef(null)

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <Box className={clsx(classes.container)} {...props}>
        {title}
        <Fade in={isOpen}>
          <Paper
            className={clsx(classes.menu, className, isOpen ? classes.open : classes.closed)}
            ref={menuRef}
            {...menuProps}
          >
            {children}
          </Paper>
        </Fade>
      </Box>
    </ClickAwayListener>
  )
}

export default memo(FadeMenu)
