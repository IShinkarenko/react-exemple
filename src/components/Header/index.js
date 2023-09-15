import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { BasicSearchField } from 'components'
import NotificationsBar from 'containers/NotificationsBar'
import { useAppState } from 'hooks/useAppState'
import { useCompanySubscriptionLevel } from 'hooks/useCompanySubscriptionLevel'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'
import routes from 'routes'

import AccountMenu from './AccountMenu'
import AuthButtons from './AuthButtons'
import LastVisitedChannelButton from './LastVisitedChannelButton'
// import LngSelection from './LngSelection'
import Logo from './Logo'
import useStyles from './styles'

const Header = ({ handleDrawerToggle, isAuthButtons, isButton }) => {
  const router = useRouter()
  const {
    query: { companyId },
  } = router
  const classes = useStyles()
  const { user } = useAppState()
  const { isCompanyBasic } = useCompanySubscriptionLevel()
  const userId = user?.attributes?.sub
  const username = user?.username

  const handleSearchByText = useCallback(
    (text) => {
      if (!text) {
        return null
      }

      router.push({
        pathname: routes.companyAssistedResearch,
        query: { companyId },
      })
      localStorage.setItem('text', text)
    },
    [companyId, router]
  )

  const handleOpenPlans = useCallback(() => {
    router.push({
      pathname: routes.companySubscription,
      query: { companyId },
    })
  }, [companyId, router])

  return (
    <AppBar position="fixed" elevation={1} className={classes.header}>
      <Toolbar className={classes.myToolbar}>
        <Logo isAuth={user} isButton={isButton} handleDrawerToggle={handleDrawerToggle} />

        <Box className={classes.headerRight}>
          {isCompanyBasic && (
            <Box className={classes.upgradeMsg}>
              <Image width={11} height={11} alt="Expandigo Basic" src={'/static/freeLevelIcon.svg'} />

              <Typography variant="body2" sx={{ ml: '3px' }}>
                Free Plan.
              </Typography>

              <Typography variant="body2" className={classes.upgradeMsgLink} onClick={handleOpenPlans}>
                Upgrade Now
              </Typography>
            </Box>
          )}

          {user && (
            <BasicSearchField
              handleSearch={handleSearchByText}
              className={classes.searchTextGlobal}
              inputClassName={classes.searchTextGlobalField}
              autoFocus={false}
            />
          )}

          <Box className={classes.headerButtons}>
            {/* <LngSelection /> */}

            {user && (
              <>
                {!isCompanyBasic && <LastVisitedChannelButton />}

                <NotificationsBar />

                <AccountMenu userId={userId} username={username} />
              </>
            )}
          </Box>

          {isAuthButtons && <AuthButtons />}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header)
