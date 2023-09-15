import InfoIcon from '@mui/icons-material/Info'
import { Box, CircularProgress, Paper, Table, TableBody, TableContainer, Typography } from '@mui/material'
import { useCompanies, useCompanyChannels, usePreferences, useUpdatePreferences } from 'api/hooks'
import { DialogPopUp, PageHead, SimpleSelect, TableRowField } from 'components'
import { DEFAULT_CHANNEL, DEFAULT_CHANNEL_NONE, DEFAULT_COMPANY } from 'constant'
import { useAppState } from 'hooks/useAppState'
import { usePreferenceState } from 'hooks/usePreferenceState'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useCallback, useEffect } from 'react'
import { getPreferenceId } from 'utils'

import useStyles from './styles'

const UserPreferences = () => {
  const { t } = useTranslation('userProfile')
  const classes = useStyles()
  const app_state = useAppState()
  const userId = app_state?.user?.attributes?.sub
  const [state, dispatch] = usePreferenceState()

  const { loading: preferencesLoading, data: data_preferences } = usePreferences({ variables: { id: userId } })
  const { loading: companiesLoading, data: data_companies } = useCompanies({ variables: { id: userId } })
  const { loading: channelsLoading, data: data_channels } = useCompanyChannels({
    skip: !state.company,
    variables: { id: state.company && state.company },
  })

  const [updateUser] = useUpdatePreferences({
    onCompleted: () => dispatch({ type: 'SET_IS_UPDATED', payload: false }),
  })

  const defaultCompanyId = getPreferenceId(data_preferences, DEFAULT_COMPANY)
  const defaultChannelId = getPreferenceId(data_preferences, DEFAULT_CHANNEL)

  const companies = data_companies?.getUser?.companies?.items

  const channels = data_channels?.getCompany?.channels?.items
  const channelNone = [{ value: DEFAULT_CHANNEL_NONE, label: t(DEFAULT_CHANNEL_NONE) }]
  const channelsOptions = channels
    ? channelNone.concat(channels.map((channel) => ({ value: channel.id, label: channel.name })))
    : channelNone

  const updatePreferences = useCallback(() => {
    const newChannel = isEmpty(channels) ? '' : state.bufferChannel ? state.bufferChannel : channels[0].id

    dispatch({ type: 'SET_CHANNEL', payload: newChannel })

    updateUser({
      variables: {
        input: {
          id: userId,
          preferences: [
            {
              preferenceType: 'DefaultCompany',
              value: state.company,
            },
            {
              preferenceType: 'DefaultChannel',
              value: newChannel,
            },
          ],
        },
      },
    })
  }, [channels, state.bufferChannel, dispatch, state.company, updateUser, userId])

  useEffect(() => {
    if (state.isUpdated) {
      updatePreferences()
    }
  }, [state.isUpdated, updatePreferences])

  useEffect(() => {
    if (defaultCompanyId) {
      dispatch({ type: 'SET_COMPANY', payload: defaultCompanyId })
    }
  }, [defaultCompanyId, dispatch])

  useEffect(() => {
    if (defaultChannelId) {
      dispatch({ type: 'SET_CHANNEL', payload: defaultChannelId })
    }
  }, [defaultChannelId, dispatch])

  const handleChangeCompany = useCallback(
    (e) => {
      const newCompany = e.target.value

      dispatch({ type: 'SET_BUFFER_COMPANY', payload: newCompany })
      dispatch({ type: 'SET_PREFERENCE_TYPE', payload: e.target.name })
      dispatch({ type: 'SET_IS_OPEN', payload: true })
    },
    [dispatch]
  )

  const handleChangeChannel = useCallback(
    (e) => {
      const newChannel = e.target.value

      dispatch({ type: 'SET_BUFFER_CHANNEL', payload: newChannel })
      dispatch({ type: 'SET_PREFERENCE_TYPE', payload: e.target.name })
      dispatch({ type: 'SET_IS_OPEN', payload: true })
    },
    [dispatch]
  )

  const cancelChange = useCallback(() => {
    dispatch({ type: 'SET_IS_OPEN', payload: false })
  }, [dispatch])

  const handleAccept = useCallback(
    (event) => {
      event.stopPropagation()

      const newCompany = state.bufferCompany ? state.bufferCompany : state.company
      dispatch({ type: 'SET_COMPANY', payload: newCompany })

      dispatch({ type: 'SET_IS_UPDATED', payload: true })
      dispatch({ type: 'SET_IS_OPEN', payload: false })
    },
    [dispatch, state.bufferCompany, state.company]
  )

  const renderDescription =
    state.preferenceType === DEFAULT_COMPANY
      ? t(
          'Are you sure you want to change the default Company, in the next sign in you will be redirect to new company page?'
        )
      : t('Are you sure you want to change the default Channel?')

  return (
    <>
      <Box>
        <PageHead title={t('Preferences')} />

        <Paper elevation={1} className={classes.preferenceContainer}>
          <Box className={classes.preferenceHead}>
            <InfoIcon />
            <Box>
              <Typography className={classes.preferenceDescr}>
                Preference settings includes options to change the default company or/and channel.
              </Typography>
              <Typography className={classes.preferenceDescr}>
                In case you change company or channel - the next time you sign in or return to the dashboard you will be
                redirected to it.
              </Typography>
            </Box>
          </Box>

          {preferencesLoading || companiesLoading || channelsLoading ? (
            <Box display="flex" justifyContent="center" alignItems={'center'}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table className={classes.preferencesTable}>
                <TableBody>
                  <TableRowField title={t('Default Company')} align="left">
                    <SimpleSelect
                      name="DefaultCompany"
                      value={state.company}
                      options={companies}
                      className={classes.select}
                      handleChange={handleChangeCompany}
                      extractValue={(option) => option.companyId}
                      extractLabel={(option) => option.companyName}
                      extractDisabled={(option) => option.companyStatus === 'PendingVerification'}
                      MenuProps={{ classes: { paper: classes.selectPaper } }}
                    />
                  </TableRowField>

                  <TableRowField title={t('Default Channel')} align="left">
                    {!isEmpty(channelsOptions) ? (
                      <SimpleSelect
                        name="DefaultChannel"
                        value={state.channel}
                        options={channelsOptions}
                        className={classes.select}
                        handleChange={handleChangeChannel}
                      />
                    ) : (
                      t('No Channels')
                    )}
                  </TableRowField>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>

      <DialogPopUp
        closeModal={cancelChange}
        title={state.preferenceType === DEFAULT_COMPANY ? t('Change Company') : t('Change Channel')}
        isOpenModal={state.isOpen}
        cancelTitle={t('Cancel')}
        successTitle={t('Change')}
        handleAccept={handleAccept}
        description={renderDescription}
        maxWidth={'xs'}
      />
    </>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['userProfile', 'userProfileMenu', 'accountMenu'])),
  },
})

export default UserPreferences
