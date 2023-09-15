import { useLazyQuery } from '@apollo/client'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import SettingsIcon from '@mui/icons-material/Settings'
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
import { CONNECTED, NONE } from 'constant'
import PublicCompanyView from 'containers/PublicCompanyView'
import React, { memo, useCallback, useEffect, useState } from 'react'

import useStyles from './styles'

const Connect = ({
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
  const [isDisconnectConfirmOpen, setIsDisconnectConfirmOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [checkedChannels, setCheckedChannels] = useState(relationshipChannels)

  const [getCompanyByDomain, { data }] = useLazyQuery(GET_COMPANIES_BY_DOMAIN, {
    fetchPolicy: 'network-only',
  })

  const matchedCompanyId = expandigoCompanyId ? expandigoCompanyId : data?.searchCompaniesByDomain?.items[0]?.id
  const isDisabled = !matchedCompanyId || !websiteUrl
  const isConnected = status === CONNECTED
  const connectTitle = isConnected ? 'Connected' : 'Connect'
  const dialogTitle = isConnected ? 'Connection Options' : 'Connect'
  const dialogSuccessTitle = isConnected ? 'Save' : 'Connect'

  useEffect(() => {
    if (!expandigoCompanyId || status === CONNECTED) {
      getCompanyByDomain({ variables: { domain: websiteUrl } })
    }
  }, [websiteUrl, getCompanyByDomain, expandigoCompanyId, status])

  const handleConnect = useCallback(
    (event) => {
      if (isConnected) {
        setAnchorEl(event.currentTarget)
      } else {
        setIsOpen(true)
      }
    },
    [isConnected]
  )

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleDisconnect = useCallback(() => {
    setIsDisconnectConfirmOpen(true)
  }, [])

  const handleDisconnectConfirm = useCallback(() => {
    handleUpdateRelationship({
      expandigoCompanyId: null,
      channels: [],
      status: NONE,
    })

    handlePopoverClose()
  }, [handlePopoverClose, handleUpdateRelationship])

  const handleConnectOptionsClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleConnectOptions = useCallback(() => {
    setIsOpen(true)
    handlePopoverClose()
  }, [handlePopoverClose])

  const handleConnectAccept = useCallback(() => {
    handleUpdateRelationship({
      expandigoCompanyId: matchedCompanyId,
      channels: checkedChannels,
      status: CONNECTED,
    })

    handleConnectOptionsClose()
  }, [checkedChannels, handleConnectOptionsClose, handleUpdateRelationship, matchedCompanyId])

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
      setIsDisconnectConfirmOpen(false)
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
            className={clsx(classes.relationshipConnect, isDisabled && classes.disabled)}
            onClick={handleConnect}
            startIcon={isConnected ? <AssignmentIndIcon /> : <AddCircleIcon />}
            disabled={isDisabled}
          >
            {connectTitle}
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

          <ListItemButton onClick={handleDisconnect} sx={{ p: '0 7px' }}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <RemoveCircleIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="Disconnect" className={classes.listItem} />
          </ListItemButton>

          <ListItemButton onClick={handleConnectOptions} sx={{ p: '0 7px' }}>
            <ListItemIcon sx={{ minWidth: '30px' }}>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>

            <ListItemText primary="Options" className={classes.listItem} />
          </ListItemButton>
        </List>
      </Popover>

      <DialogPopUp
        isOpenModal={isOpen}
        closeModal={handleConnectOptionsClose}
        fullWidth={false}
        dialogContentClasses={classes.relationshipConnectDialog}
        title={dialogTitle}
        successTitle={dialogSuccessTitle}
        handleAccept={handleConnectAccept}
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
        isOpenModal={isDisconnectConfirmOpen}
        cancelTitle={'Cancel'}
        successTitle={'Change'}
        title={'Disconnect'}
        handleAccept={handleDisconnectConfirm}
        description={`Are you sure that you want to disconnect from this company?`}
        maxWidth="xs"
      />
    </>
  )
}

export default memo(Connect)
