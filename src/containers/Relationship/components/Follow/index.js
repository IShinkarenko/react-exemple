import { useLazyQuery } from '@apollo/client'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import VerifiedIcon from '@mui/icons-material/Verified'
import WorkIcon from '@mui/icons-material/Work'
import {
  Button,
  Checkbox,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material'
import { GET_COMPANIES_BY_DOMAIN } from 'api/hooks/queries/useSearchCompaniesByDomain/useSearchCompaniesByDomain.gql'
import clsx from 'clsx'
import { DialogPopUp } from 'components'
import { FOLLOWING, NONE } from 'constant'
import PublicCompanyView from 'containers/PublicCompanyView'
import React, { memo, useCallback, useEffect, useState } from 'react'

import useStyles from './styles'

const Follow = ({
  status,
  websiteUrl,
  companyChannels,
  expandigoCompanyId,
  relationshipChannels,
  handleUpdateRelationship,
}) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPublic, setIsPublic] = useState(false)
  const [isUnfollowConfirmOpen, setIsUnfollowConfirmOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [checkedChannels, setCheckedChannels] = useState(relationshipChannels)

  const [getCompanyByDomain, { data }] = useLazyQuery(GET_COMPANIES_BY_DOMAIN, {
    fetchPolicy: 'network-only',
  })

  const matchedCompanyId = expandigoCompanyId ? expandigoCompanyId : data?.searchCompaniesByDomain?.items[0]?.id
  const isDisabled = !matchedCompanyId || !websiteUrl
  const isFollowing = status === FOLLOWING
  const followTitle = isFollowing ? 'Following' : 'Follow'
  const dialogTitle = isFollowing ? 'Following Options' : 'Follow'
  const dialogSuccessTitle = isFollowing ? 'Save' : 'Follow'

  useEffect(() => {
    if (!expandigoCompanyId || status === NONE) {
      getCompanyByDomain({ variables: { domain: websiteUrl } })
    }
  }, [websiteUrl, getCompanyByDomain, expandigoCompanyId, status])

  const handleFollow = useCallback(
    (event) => {
      if (isFollowing) {
        setAnchorEl(event.currentTarget)
      } else {
        setIsOpen(true)
      }
    },
    [isFollowing]
  )

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleUnFollow = useCallback(() => {
    setIsUnfollowConfirmOpen(true)
  }, [])

  const handleUnfollowConfirm = useCallback(() => {
    handleUpdateRelationship({
      expandigoCompanyId: null,
      channels: [],
      status: NONE,
    })

    handlePopoverClose()
  }, [handlePopoverClose, handleUpdateRelationship])

  const handleFollowOptionsClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleFollowOptions = useCallback(() => {
    setIsOpen(true)
    handlePopoverClose()
  }, [handlePopoverClose])

  const handleFollowAccept = useCallback(() => {
    handleUpdateRelationship({
      expandigoCompanyId: matchedCompanyId,
      channels: checkedChannels,
      status: FOLLOWING,
    })

    handleFollowOptionsClose()
  }, [checkedChannels, handleFollowOptionsClose, handleUpdateRelationship, matchedCompanyId])

  const handleCollapseCahnnels = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const handleToggle = useCallback(
    (value) => () => {
      const currentIndex = checkedChannels.indexOf(value)
      const newChecked = [...checkedChannels]

      if (currentIndex === -1) {
        newChecked.push(value)
      } else {
        newChecked.splice(currentIndex, 1)
      }

      setCheckedChannels(newChecked)
    },
    [checkedChannels]
  )

  const handleOpenProfileClick = useCallback(() => {
    setIsPublic(true)
  }, [])

  const handleDialogClose = useCallback(() => {
    if (isPublic) {
      setIsPublic(false)
    } else {
      setIsUnfollowConfirmOpen(false)
    }
  }, [isPublic])

  return (
    <>
      <Tooltip
        arrow
        title={'Please add a website so we can look for matches in our ecosystem of companies.'}
        disableHoverListener={!!websiteUrl}
      >
        <span>
          <Button
            variant="contained"
            className={clsx(classes.relationshipFollow, isDisabled && classes.disabled)}
            onClick={handleFollow}
            startIcon={isFollowing ? <VerifiedIcon /> : <AddCircleIcon />}
            disabled={isDisabled}
          >
            {followTitle}
          </Button>
        </span>
      </Tooltip>

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
      >
        <List>
          <ListItemButton sx={{ p: '0 7px' }} onClick={handleOpenProfileClick}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <WorkIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="See Public Profile" className={classes.listItem} />
          </ListItemButton>

          <ListItemButton onClick={handleUnFollow} sx={{ p: '0 7px' }}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <RemoveCircleIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="Unfollow" className={classes.listItem} />
          </ListItemButton>

          <ListItemButton onClick={handleFollowOptions} sx={{ p: '0 7px' }}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="Options" className={classes.listItem} />
          </ListItemButton>
        </List>
      </Popover>

      <DialogPopUp
        isOpenModal={isOpen}
        closeModal={handleFollowOptionsClose}
        fullWidth={false}
        dialogContentClasses={classes.relationshipFollowDialog}
        title={dialogTitle}
        successTitle={dialogSuccessTitle}
        handleAccept={handleFollowAccept}
      >
        <List
          component="nav"
          sx={{ width: '280px' }}
          subheader={
            <ListSubheader>
              <Typography variant="subtitle2" sx={{ mt: 1, mb: 2 }}>
                On what channels would you like to see this company?
              </Typography>
            </ListSubheader>
          }
        >
          <ListItemButton onClick={handleCollapseCahnnels}>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>

            <ListItemText primary="Channels" />
            {isCollapsed ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {companyChannels.map(({ id, name }, index) => (
                <ListItemButton
                  key={index}
                  role={undefined}
                  onClick={handleToggle(id)}
                  dense
                  sx={{ padding: '4px 32px' }}
                >
                  <ListItemIcon>
                    <Checkbox edge="start" checked={checkedChannels.indexOf(id) !== -1} tabIndex={-1} disableRipple />
                  </ListItemIcon>

                  <ListItemText primary={name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </DialogPopUp>

      <DialogPopUp
        isOpenModal={isPublic}
        closeModal={handleDialogClose}
        maxWidth={'lg'}
        isButton
        dialogContentClasses={classes.dialogContent}
      >
        <PublicCompanyView companyId={expandigoCompanyId} />
      </DialogPopUp>

      <DialogPopUp
        closeModal={handleDialogClose}
        isOpenModal={isUnfollowConfirmOpen}
        cancelTitle={'Cancel'}
        successTitle={'Change'}
        title={'Unfollow'}
        handleAccept={handleUnfollowConfirm}
        description={`Are you sure that you want to unfollow this company?`}
        maxWidth="xs"
      />
    </>
  )
}

export default memo(Follow)
