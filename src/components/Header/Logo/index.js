/* eslint-disable @next/next/no-img-element */
import MenuIcon from '@mui/icons-material/Menu'
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import Link from 'next/link'
import React, { memo } from 'react'
import routes from 'routes'

import useStyles from './styles'

const Logo = ({ isAuth, handleDrawerToggle, isButton }) => {
  const classes = useStyles()

  const theme = useTheme()
  const isMenuButton = useMediaQuery(theme.breakpoints.down('md'))
  const isLogo = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box className={classes.logoContainer}>
      {isAuth || isButton ? (
        <>
          {isMenuButton && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
              size="large"
            >
              <MenuIcon />
            </IconButton>
          )}

          {isLogo && (
            <Link href={routes.home} passHref={true}>
              <img src="/static/expandigo-logo.png" title="Expandigo" className={classes.logo} alt="Expandigo" />
            </Link>
          )}
        </>
      ) : (
        <Link href={routes.home} passHref={true}>
          <img src="/static/expandigo-logo.png" title="Expandigo" className={classes.logo} alt="Expandigo" />
        </Link>
      )}
    </Box>
  )
}

export default memo(Logo)
