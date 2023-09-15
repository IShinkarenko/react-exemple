import { Box } from '@mui/material'
import { BaseButton } from 'components'
import { SIGN_IN, SIGN_UP } from 'constant'
import { useAppDispatch } from 'hooks/useAppState'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'
import routes from 'routes'

import useStyles from './styles'

const AuthButtons = () => {
  const { t } = useTranslation('common')
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSignIn = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
    router.push(routes.signIn)
  }, [dispatch, router])

  const handleSignUp = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_UP })
    router.push(routes.signIn)
  }, [dispatch, router])

  return (
    <Box ml={3}>
      <BaseButton title={t('Sign Up')} variant="text" className={classes.authButton} onClick={handleSignUp} />
      <BaseButton title={t('Sign In')} variant="outlined" className={classes.authButton} onClick={handleSignIn} />
    </Box>
  )
}

export default memo(AuthButtons)
