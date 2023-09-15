import { Box, Divider } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { memo } from 'react'

import CompanyMenu from '../CompanyMenu'
import UserProfileMenu from '../UserProfileMenu'
import useStyles from './styles'

const SidebarMenu = () => {
  const classes = useStyles()
  const { pathname } = useRouter()
  const isUserProfile = pathname.startsWith('/user')

  return (
    <Box>
      <Box className={classes.sidebarLogo}>
        <Image src={'/static/expandigo-logo.png'} alt="Expandigo" width={140} height={60} />
      </Box>

      <Divider light />

      {isUserProfile ? <UserProfileMenu /> : <CompanyMenu />}
    </Box>
  )
}
export default memo(SidebarMenu)
