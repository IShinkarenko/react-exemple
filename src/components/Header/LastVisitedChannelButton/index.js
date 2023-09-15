import { IconButton, Tooltip } from '@mui/material'
import { useAppState } from 'hooks/useAppState'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import routes from 'routes'

const LastVisitedChannelButton = () => {
  const { t } = useTranslation('accountMenu')
  const state = useAppState()
  const router = useRouter()

  const handlePrevChannel = useCallback(() => {
    if (state.lastVisitedChannelLink) {
      router.push(state.lastVisitedChannelLink)
    } else {
      router.push(routes.home)
    }
  }, [router, state.lastVisitedChannelLink])

  return (
    <Tooltip title={t('Last visited channel')}>
      <IconButton onClick={handlePrevChannel} size="small">
        <Image src={'/static/hashtag.svg'} alt="last visited channel" width={19} height={19} />
      </IconButton>
    </Tooltip>
  )
}

export default LastVisitedChannelButton
