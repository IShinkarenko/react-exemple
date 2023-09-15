import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Avatar, Divider, IconButton, ListItem, ListItemText, Menu, Tooltip, Typography } from '@mui/material'
import { useCompany, usePreferences, useUserProfile } from 'api/hooks'
import { Auth } from 'aws-amplify'
import { LinkItem } from 'components'
import SingleListItem from 'components/SingleListItem'
import { DEFAULT_CHANNEL, DEFAULT_COMPANY, NEW } from 'constant'
import { links } from 'containers/Sidebar/components/CompanyMenu/constants'
import { userLinks } from 'containers/Sidebar/components/UserProfileMenu/constants'
import { useAppDispatch } from 'hooks/useAppState'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import routes from 'routes'
import { getPreferenceId, getRestrictedMenuItems } from 'utils'

import useStyles from './styles'

const AccountMenu = ({ userId, username }) => {
  const { t } = useTranslation('accountMenu')
  const dispatch = useAppDispatch()
  const {
    query: { companyId },
  } = useRouter()

  const router = useRouter()
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const { data: data_preferences } = usePreferences({
    skip: !userId,
    variables: { id: userId },
  })
  const defaultChannelId = getPreferenceId(data_preferences, DEFAULT_CHANNEL)
  const activeCompanyId = companyId ? companyId : getPreferenceId(data_preferences, DEFAULT_COMPANY)
  const { data: data_company } = useCompany({
    skip: !activeCompanyId,
    variables: { id: activeCompanyId },
  })
  const company = data_company?.getCompany
  const isNewCompany = company?.status === NEW && !defaultChannelId
  const restrictedMenuItems = getRestrictedMenuItems(company?.subscriptionLevel)
  const companyMenuItems = restrictedMenuItems
    ? links(t).filter((f) => !restrictedMenuItems.includes(f.type))
    : links(t)

  const { data } = useUserProfile({ variables: { id: userId } })
  const avatar = data?.getUser?.avatarUrl
  const fullName = data?.getUser?.fullName

  useEffect(() => {
    const handleRouteChange = () => {
      if (anchorEl) handleClose()
    }

    router.events.on('routeChangeStart', handleRouteChange)
  }, [router.events, anchorEl])

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleSignOut = useCallback(async () => {
    dispatch({ type: 'SET_SIGN_OUT_LOADING', payload: true })

    try {
      await Auth.signOut()
      router.push('/')
      setAnchorEl(null)
    } catch (err) {
      console.log('Catch Error:', err)
    }
  }, [router, dispatch])

  return (
    <>
      <Tooltip title="Account Menu">
        <IconButton onClick={handleMenu} size="small">
          <Avatar sx={{ width: 27, height: 27 }} alt={fullName} src={avatar} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ListItem className={classes.menuSection}>
          <ListItemText primary={<Typography variant="body2">{company?.name}</Typography>} />
        </ListItem>

        {!isNewCompany &&
          companyMenuItems.map((link) => (
            <LinkItem
              key={link.title}
              linkTitle={t(`${link.title}`)}
              redirectTo={{
                pathname: link.route,
                query: { companyId: activeCompanyId },
              }}
              itemIcon={link.icon}
              className={classes.menuItem}
            />
          ))}

        <LinkItem
          linkTitle={t(`Current Plan`)}
          redirectTo={{
            pathname: routes.companySubscription,
            query: { companyId: activeCompanyId },
          }}
          itemIcon={<ListAltIcon />}
          className={classes.menuItem}
        />

        <ListItem className={classes.menuSection}>
          <ListItemText primary={<Typography variant="body2">{username}</Typography>} />
        </ListItem>

        {userLinks.map((link) => (
          <LinkItem
            key={link.title}
            linkTitle={t(`${link.title}`)}
            redirectTo={{
              pathname: link.route,
            }}
            itemIcon={link.icon}
            className={classes.menuItem}
          />
        ))}

        <Divider />

        <SingleListItem itemText={`${t('Sign Out')}`} itemIcon={<ExitToAppIcon />} handleClick={handleSignOut} />
      </Menu>
    </>
  )
}

export default AccountMenu
