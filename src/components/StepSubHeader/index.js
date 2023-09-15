import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React from 'react'

import useStyles from './styles'

const StepSubHeader = ({ header, headerVariant = 'h4', body, mb = 0, mt = 0, align, classBox }) => {
  const classes = useStyles()
  return (
    <Box mb={mb} mt={mt} className={classBox}>
      <Typography variant={headerVariant} gutterBottom align={align}>
        {header}
      </Typography>
      <Typography variant="body2" gutterBottom align={align} className={classes.body}>
        {body}
      </Typography>
    </Box>
  )
}

export default StepSubHeader
