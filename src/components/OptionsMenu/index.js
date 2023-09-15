import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import clsx from 'clsx'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import useStyles from './styles'

const OptionsMenu = ({ actions, title, closeFlag, className, buttonClassName }) => {
  const { t } = useTranslation('companyProfile')

  const classes = useStyles()

  useEffect(() => {
    if (closeFlag) {
      setAnchorEl(null)
    }
  }, [closeFlag])

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <>
      {title ? (
        <Box onClick={handleOpenMenu}>{title}</Box>
      ) : (
        <Tooltip title={t('Options')}>
          <IconButton
            color="inherit"
            onClick={handleOpenMenu}
            className={clsx(classes.iconButton, buttonClassName)}
            size="large"
          >
            <MoreVertIcon />
          </IconButton>
        </Tooltip>
      )}

      <Menu anchorEl={anchorEl} keepMounted open={!!anchorEl} onClose={handleCloseMenu} classes={{ list: className }}>
        {actions.map(({ title, icon, handleClick, disabled }) => (
          <MenuItem key={title} onClick={handleClick} className={classes.menuItem} disabled={disabled}>
            {icon && <Box className={classes.icon}>{icon}</Box>}
            <Typography variant="caption">{title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default OptionsMenu
