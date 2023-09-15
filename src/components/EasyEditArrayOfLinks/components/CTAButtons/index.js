import LaunchIcon from '@mui/icons-material/Launch'
import { Box, Link, Tooltip } from '@mui/material'
import { CopyToClipboardWrapper } from 'components'
import React from 'react'

import useStyles from './styles'

const CTAButtons = ({ value }) => {
  const classes = useStyles()

  return (
    <Box display="flex" alignItems="center">
      <Tooltip title={'Follow The Link'} placement={'top'} arrow>
        <Link href={value} variant="body2" className={classes.link} target="_blank" rel="noopener">
          <LaunchIcon className={classes.launchIcon} color="action" />
        </Link>
      </Tooltip>

      <CopyToClipboardWrapper value={value} />
    </Box>
  )
}

export default CTAButtons
