import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, IconButton, Typography } from '@mui/material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { memo } from 'react'

import useStyles from './styles'

const PageHeading = ({ title, left, right, backLink, backLinkOnclick, variant = 'h3', className, backIcon }) => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <Box className={clsx(classes.header, className)}>
      <div className={classes.titleWrapper}>
        {(backLink || backLinkOnclick) && (
          <IconButton
            color="inherit"
            aria-label="back"
            className={classes.backBtn}
            onClick={backLinkOnclick ? backLinkOnclick : () => router.push(`${backLink}`)}
            size="large"
          >
            {backIcon ? backIcon : <ArrowBackIcon color="inherit" />}
          </IconButton>
        )}
        <Typography variant={variant} className={classes.title} noWrap>
          {title}
        </Typography>
      </div>

      {left && <div className={classes.headerLeft}>{left}</div>}

      {right && <div className={classes.headerRight}>{right}</div>}
    </Box>
  )
}

export default memo(PageHeading)
