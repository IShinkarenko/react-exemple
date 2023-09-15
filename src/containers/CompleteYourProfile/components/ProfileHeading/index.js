import 'react-circular-progressbar/dist/styles.css'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Box, Typography } from '@mui/material'
import React, { memo } from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'

import useStyles from './styles'

const ProfileHeading = ({ heading, score, fieldsCount }) => {
  const classes = useStyles()
  const isDone = score === fieldsCount

  return (
    <>
      <Box className={classes.accordionProgress}>
        {isDone ? (
          <CheckCircleIcon className={classes.done} color="primary" />
        ) : (
          <Box width={30}>
            <CircularProgressbar
              value={(score / fieldsCount) * 100}
              strokeWidth={11}
              styles={buildStyles({
                textColor: '#333',
                pathColor: '#74D3D1',
              })}
            />
          </Box>
        )}
        <Typography className={classes.heading}>{heading}</Typography>
      </Box>

      <Typography className={classes.secondaryHeading}>{`${score}/${fieldsCount}`}</Typography>
    </>
  )
}

export default memo(ProfileHeading)
