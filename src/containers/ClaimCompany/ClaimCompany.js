import AssignmentLateIcon from '@mui/icons-material/AssignmentLate'
import { Box, Button, Typography } from '@mui/material'
import { useClaimExistingCompany } from 'api/hooks'
import { GET_COMPANIES } from 'api/hooks/queries/useCompanies/useCompanies.gql'
import { GET_PUBLIC_COMPANY } from 'api/hooks/queries/usePublicCompany/usePublicCompany.gql'
import { BaseButton, DialogPopUp } from 'components'
import { CLAIM, SIGN_IN, SIGN_UP } from 'constant'
import { useAppDispatch } from 'hooks/useAppState'
import { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import routes from 'routes'

import useStyles from './styles'

const ClaimCompany = ({ companyId, companyName, user }) => {
  const classes = useStyles()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isOpenAuthorizedModal, setIsOpenAuthorizedModal] = useState(false)
  const [isOpenUnAuthorizedModal, setIsUnOpenAuthorizedModal] = useState(false)
  const isUserAuthorized = !!user
  const userId = user?.attributes?.sub
  const [claimExistingCompany] = useClaimExistingCompany({
    refetchQueries: [
      { query: GET_COMPANIES, variables: { id: userId, limit: 5 } },
      { query: GET_PUBLIC_COMPANY, variables: { id: companyId } },
    ],
    awaitRefetchQueries: true,
    onCompleted: () => {
      handleDialogClose()
      toast('Company is successfully claimed.')
    },
  })

  const handleClick = useCallback(() => {
    if (isUserAuthorized) {
      setIsOpenAuthorizedModal(true)
    } else {
      setIsUnOpenAuthorizedModal(true)
    }
  }, [isUserAuthorized])

  const handleDialogClose = useCallback(() => {
    if (isOpenAuthorizedModal) {
      setIsOpenAuthorizedModal(false)
    } else {
      setIsUnOpenAuthorizedModal(false)
    }
  }, [isOpenAuthorizedModal])

  const handleSignIn = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_IN })
    localStorage.setItem('claimedCompany', JSON.stringify({ companyId, name: companyName, type: CLAIM }))
    router.push(routes.signIn)
  }, [companyId, companyName, dispatch, router])

  const handleSignUp = useCallback(() => {
    dispatch({ type: 'SET_AUTH_FORM_TYPE', payload: SIGN_UP })
    localStorage.setItem('claimedCompany', JSON.stringify({ companyId, name: companyName, type: CLAIM }))
    router.push(routes.signIn)
  }, [companyId, companyName, dispatch, router])

  const handleCancelClaim = useCallback(() => {
    handleDialogClose()
  }, [handleDialogClose])

  const handleConfirmClaim = useCallback(() => {
    claimExistingCompany({
      variables: {
        input: {
          userId,
          claimedCompanyId: companyId,
        },
      },
    })
  }, [claimExistingCompany, companyId, userId])

  return (
    <>
      <Typography variant="caption" onClick={handleClick}>
        <AssignmentLateIcon color="primary" />

        <span>Claim</span>
      </Typography>

      {isOpenAuthorizedModal && (
        <DialogPopUp
          isOpenModal={isOpenAuthorizedModal}
          title={'Claim Company Profile'}
          description={
            'You will be unable to edit this company until verification completes. This usually takes up to 3 business days. By confirming below, you agree that you are the rightful owner and reaffirm the Terms and Conditions that apply to your use of the Expandigo application.'
          }
          closeModal={handleDialogClose}
          dialogActions={
            <Box>
              <BaseButton title={'Cancel'} variant="outlined" onClick={handleCancelClaim} />
              <BaseButton title={'Confirm'} className={classes.confirmClaimButton} onClick={handleConfirmClaim} />
            </Box>
          }
        />
      )}

      {isOpenUnAuthorizedModal && (
        <DialogPopUp
          isOpenModal={isOpenUnAuthorizedModal}
          title={'Claim Company Profile'}
          description={
            'This company profile was generated and remains unclaimed.  To claim this profile, you must be a signed-in user. A verification process will follow to ensure proper ownership. What would you like to do?'
          }
          closeModal={handleDialogClose}
          dialogActions={
            <Box className={classes.claimButtons}>
              <Button onClick={handleDialogClose}>Cancel</Button>

              <Box>
                <BaseButton title={'Sign Up'} variant="outlined" onClick={handleSignUp} />
                <BaseButton title={'Sign In'} className={classes.signInButton} onClick={handleSignIn} />
              </Box>
            </Box>
          }
        />
      )}
    </>
  )
}

export default memo(ClaimCompany)
