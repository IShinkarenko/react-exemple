import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Divider, List } from '@mui/material'
import { LinkItem, SingleListItem } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo } from 'react'
import routes from 'routes'

import { userLinks } from './constants'

const UserProfileMenu = () => {
  const { t } = useTranslation('userProfileMenu')
  const router = useRouter()

  return (
    <Box>
      <List disablePadding component="div">
        <Box bgcolor="#f3f3f3">
          <SingleListItem
            itemText={`${t('Back to DashBoard')}`}
            itemIcon={<ArrowBackIcon />}
            handleClick={() => router.push(routes.home)}
          />
          <Divider />
        </Box>

        {userLinks.map((link) => (
          <LinkItem
            key={link.title}
            linkTitle={t(`${link.title}`)}
            redirectTo={{
              pathname: link.route,
            }}
            itemIcon={link.icon}
          />
        ))}
      </List>
    </Box>
  )
}

export default memo(UserProfileMenu)
