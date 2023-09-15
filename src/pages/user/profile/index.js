import { Box, Paper, Table, TableBody, TableContainer } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { useUpdateUserProfile, useUserProfile } from 'api/hooks'
import { withSSRContext } from 'aws-amplify'
import { Avatar, EasyEditField, PageHead, TableRowField } from 'components'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback, useEffect } from 'react'
import { getLogoUploadUrl } from 'utils'

import useStyles from './styles'

const UserProfile = ({ userId }) => {
  const { t } = useTranslation('userProfile')
  const classes = useStyles()
  const { isAvatarUpdated, avatar } = useAppState()
  const dispatch = useAppDispatch()
  const { data } = useUserProfile({ variables: { id: userId } })
  const [updateUser] = useUpdateUserProfile()
  const user = data?.getUser
  const uploadUrl = getLogoUploadUrl({ userId })

  useEffect(() => {
    if (isAvatarUpdated) {
      updateUserLogo()
    }

    dispatch({ type: 'SET_IS_AVATAR_UPDATED', payload: false })
  }, [isAvatarUpdated, dispatch, updateUserLogo])

  const updateUserLogo = useCallback(() => {
    const data = { avatarUrl: avatar }

    updateUserData(data)
  }, [updateUserData, avatar])

  const handleFieldSave = useCallback(
    ({ name, value }) => {
      const data = { [name]: value }

      updateUserData(data)
    },
    [updateUserData]
  )

  const updateUserData = useCallback(
    (data) => {
      updateUser({
        variables: {
          input: {
            id: userId,
            ...data,
          },
        },
      })
    },
    [userId, updateUser]
  )

  return (
    <Box role="complementary">
      {user ? <PageHead title={user?.userName} /> : <Skeleton variant="text" width={'200px'} height={70} />}

      <Paper elevation={1}>
        <TableContainer>
          <Table className={classes.profileTable}>
            <TableBody>
              <TableRowField title={t('avatar')} align="left">
                <Avatar url={uploadUrl} src={user?.avatarUrl} name={user?.userName} />
              </TableRowField>

              <TableRowField title={t('full name')} align="left">
                {user ? (
                  <EasyEditField name="fullName" value={user?.fullName ?? ''} handleSave={handleFieldSave} />
                ) : (
                  <Skeleton variant="text" width={'50%'} height={30} />
                )}
              </TableRowField>

              <TableRowField title={t('email address')} align="left">
                {user ? (
                  <EasyEditField name="emailAddress" value={user?.emailAddress ?? ''} handleSave={handleFieldSave} />
                ) : (
                  <Skeleton variant="text" width={'50%'} height={30} />
                )}
              </TableRowField>

              <TableRowField title={t('phone number')} align="left">
                {user ? (
                  <EasyEditField name="phoneNumber" value={user?.phoneNumber ?? ''} handleSave={handleFieldSave} />
                ) : (
                  <Skeleton variant="text" width={'50%'} height={30} />
                )}
              </TableRowField>

              <TableRowField title={t('bio')} align="left">
                {user ? (
                  <EasyEditField name="bio" value={user?.bio ?? ''} handleSave={handleFieldSave} textfiled />
                ) : (
                  <Skeleton variant="text" width={'50%'} height={30} />
                )}
              </TableRowField>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export const getServerSideProps = async ({ locale, req }) => {
  const { Auth } = withSSRContext({ req })
  let userProps = {}

  try {
    const user = await Auth.currentAuthenticatedUser()

    userProps = {
      userId: user.attributes.sub,
      userName: user.username,
    }
  } catch (err) {
    console.log('error, user not authenticated')
  }

  return {
    props: {
      ...userProps,
      ...(await serverSideTranslations(locale, ['userProfile', 'userProfileMenu', 'accountMenu'])),
    },
  }
}

export default UserProfile
