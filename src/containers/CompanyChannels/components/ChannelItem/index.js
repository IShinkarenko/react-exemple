import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { Typography } from '@mui/material'
import { useDeleteCompanyChannel, usePreferences } from 'api/hooks'
import { ActionMenu, DialogPopUp, Heading, LinkItem } from 'components'
import { DEFAULT_CHANNEL } from 'constant'
import { useAppDispatch, useAppState } from 'hooks/useAppState'
import { useTranslation } from 'next-i18next'
import router, { useRouter } from 'next/router'
import React, { memo, useCallback, useState } from 'react'
import routes from 'routes'
import { getPreferenceId } from 'utils'

import useStyles from './styles'

const ChannelItem = ({ channel: { id, name, instanceStatus } }) => {
  const { t } = useTranslation('channels')
  const classes = useStyles()
  const {
    query: { companyId, channelId },
  } = useRouter()
  const state = useAppState()
  const dispatch = useAppDispatch()
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [isWarningModal, setIsWarningModal] = useState(false)
  const userId = state?.user?.attributes?.sub

  const { data } = usePreferences({ variables: { id: userId } })
  const defaultChannelId = getPreferenceId(data, DEFAULT_CHANNEL)

  const [deleteCompanyChannel] = useDeleteCompanyChannel({
    onCompleted: () => {
      router.push({
        pathname: routes.companyChannel,
        query: { companyId, channelId: defaultChannelId },
      })
    },
  })

  const handleEditChannel = useCallback(() => {
    dispatch({ type: 'SET_CHANNEL_TAB', payload: 3 })
  }, [dispatch])

  const handleOpenDeleteChannelDialog = () => {
    setIsDeleteModal(true)
  }

  const handleDialogClose = () => {
    if (isDeleteModal) {
      setIsDeleteModal(false)
    } else {
      setIsWarningModal(false)
    }
  }

  const handleDeleteChannel = () => {
    const isNotdefaultChannel = id !== defaultChannelId

    if (isNotdefaultChannel) {
      deleteCompanyChannel({
        variables: {
          id,
        },
        update: (cache, { data: { deleteCompanyChannel } }) => {
          cache.evict({ id: cache.identify(deleteCompanyChannel) })
          cache.gc()
        },
      })
    } else {
      setIsDeleteModal(false)
      setIsWarningModal(true)
    }
  }

  const handleRedirectToPreferences = () => {
    setIsWarningModal(false)

    router.push({
      pathname: routes.userPreferences,
    })
  }

  const actions = [
    {
      title: t('Edit'),
      icon: <EditIcon />,
      handleClick: handleEditChannel,
    },
    {
      title: t('Delete'),
      icon: <DeleteIcon />,
      handleClick: handleOpenDeleteChannelDialog,
    },
  ]

  return (
    <>
      <LinkItem
        nested
        id={id}
        redirectTo={{
          pathname: routes.companyChannel,
          query: { companyId, channelId: id },
        }}
        linkTitle={<Heading name={name} instanceStatus={instanceStatus} />}
      >
        {id === channelId && <ActionMenu actions={actions} />}
      </LinkItem>

      <DialogPopUp
        isOpenModal={isDeleteModal}
        maxWidth={'xs'}
        title={t('Delete Channel')}
        description={t('Are you sure you want to delete channel?')}
        successTitle={t('Delete')}
        cancelTitle={t('Cancel')}
        closeModal={handleDialogClose}
        handleAccept={handleDeleteChannel}
      />

      <DialogPopUp
        isOpenModal={isWarningModal}
        maxWidth={'xs'}
        title={t('Warning!')}
        description={
          <>
            {t('You cannot delete the Default Channel. You can change the default channel in your ')}
            <Typography variant="subtitle1" onClick={handleRedirectToPreferences} className={classes.link}>
              {t('User Preferences.')}
            </Typography>
          </>
        }
        closeModal={handleDialogClose}
      />
    </>
  )
}

export default memo(ChannelItem)
