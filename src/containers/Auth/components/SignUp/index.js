import { Box } from '@mui/material'
import CompleteYourProfile from 'containers/CompleteYourProfile'
import React from 'react'

import useStyles from './styles'

const SignUpCustom = () => {
  const classes = useStyles()

  return (
    <Box className={classes.signUpContainer}>
      <CompleteYourProfile className={classes.signUpCompleteProfile} />
    </Box>
  )
}

export default SignUpCustom
