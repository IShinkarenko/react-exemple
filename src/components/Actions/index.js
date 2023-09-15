import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Button, IconButton, MenuItem, useMediaQuery } from '@mui/material'
import { DropDownMenu } from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo, useCallback, useEffect } from 'react'

import useStyles from './styles'

const Actions = ({ actions, closeFlag }) => {
  const { t } = useTranslation('relationships')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const matches = useMediaQuery('(max-width:767px)')

  useEffect(() => {
    if (closeFlag) {
      setAnchorEl(null)
    }
  }, [closeFlag])

  const handleClick = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      {matches ? (
        <IconButton size="small" onClick={handleClick}>
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
      ) : (
        <Button variant="outlined" onClick={handleClick} className={classes.button}>
          {t('Actions')}
        </Button>
      )}

      <DropDownMenu anchorEl={anchorEl} handleClose={handleClose} horizontal={'left'}>
        {actions.map(({ label, handleClick, disabled }) => (
          <MenuItem key={label} onClick={handleClick} className={classes.menuItem} disabled={disabled}>
            {label}
          </MenuItem>
        ))}
      </DropDownMenu>
    </>
  )
}

export default memo(Actions)
