import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import clsx from 'clsx'
import { VisibilityBadget } from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo, useState } from 'react'

import useStyles from './styles'

const SwitcherVisibility = ({ value, id, handleChange, className, classNameMenuItem }) => {
  const { t } = useTranslation('companyProfile')
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const visibilityOptions = ['Offline', 'PrivateNetworkOnly', 'ByRequestOnly', 'PublicNetwork']

  const handleClickListItem = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleMenuItemClick = (event, visibilityLevel) => {
    event.preventDefault()
    event.stopPropagation()

    const data = { ...(id && { id }), visibilityLevel }

    handleClose()
    handleChange(data)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {value && (
        <>
          <VisibilityBadget
            isDropDown
            visibilityLevel={value}
            handleClick={handleClickListItem}
            className={clsx(classes.switcher, className)}
          />

          <Menu id="lock-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {visibilityOptions.map((visibilityLevel) => {
              return (
                <MenuItem
                  key={visibilityLevel}
                  selected={visibilityLevel === value}
                  className={clsx(classes.menuItem, classNameMenuItem)}
                  onClick={(event) => handleMenuItemClick(event, visibilityLevel)}
                >
                  {t(visibilityLevel)}
                </MenuItem>
              )
            })}
          </Menu>
        </>
      )}
    </>
  )
}

export default memo(SwitcherVisibility)
