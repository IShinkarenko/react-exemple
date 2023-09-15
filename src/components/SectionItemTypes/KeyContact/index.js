import { Avatar, Box, Divider, Link, Paper, Typography } from '@mui/material'
import CopyToClipboardWrapper from 'components/CopyToClipboardWrapper'
import React, { memo } from 'react'
import { capitalizeFirstLetters } from 'utils'

import useStyles from './styles'

const KeyContact = ({ value: { Email, LinkedIn, Name, Title } }) => {
  const classes = useStyles()

  return (
    <Box className={classes.keyContact} p={1}>
      <Paper elevation={3} className={classes.keyContactInner}>
        <Box className={classes.keyContactHead}>
          <Box display="flex">
            <Avatar>
              <Typography variant="subtitle2">{capitalizeFirstLetters(Name)}</Typography>
            </Avatar>
            <Typography variant="h6" className={classes.keyContactName}>
              {Name}
              <Typography variant="body2" color="textSecondary">
                {Title}
              </Typography>
            </Typography>
          </Box>
        </Box>

        <Divider />

        {Email && (
          <Box>
            <Box mt={2}>
              <Typography variant="subtitle2">
                <CopyToClipboardWrapper value={Email} className={classes.keyContactsCopy}>
                  Email:
                </CopyToClipboardWrapper>
                <Link href={`mailto:${Email}`} className={classes.email}>
                  {Email}
                </Link>
              </Typography>
            </Box>
          </Box>
        )}

        {LinkedIn && (
          <Box mt={2}>
            <Typography variant="subtitle2">
              <CopyToClipboardWrapper value={LinkedIn}>LinkedIn:</CopyToClipboardWrapper>
              <Link href={LinkedIn} target="_blank" variant="body2" rel="noreferrer" className={classes.link}>
                {LinkedIn}
              </Link>
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}

export default memo(KeyContact)
