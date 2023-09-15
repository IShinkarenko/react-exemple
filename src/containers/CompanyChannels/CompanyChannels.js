import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial'
import { Collapse, IconButton, ListItem, ListItemIcon, ListItemText, Tooltip } from '@mui/material'
import clsx from 'clsx'
import { DialogPopUp } from 'components'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

import AddNewChannel from './components/AddNewChannel'
import ChannelsList from './components/ChannelsList'
import useStyles from './styles'

const CompanyChannels = ({ activeCompanyId }) => {
  const { t } = useTranslation(['companyMenu'])
  const classes = useStyles()

  const [isOpen, setIsOpen] = useState(true)
  const [isAddNewChannel, setIsAddNewChannel] = useState(false)

  const toggleList = () => {
    setIsOpen(!isOpen)
  }

  const handleOpenAddChannelDialog = (event) => {
    event.preventDefault()
    event.stopPropagation()

    setIsAddNewChannel(true)
  }

  const handleDialogClose = () => {
    setIsAddNewChannel(false)
  }

  return (
    <>
      <ListItem button onClick={toggleList} className={clsx(classes.item)}>
        <ListItemIcon>{isOpen ? <FolderOpenIcon /> : <FolderSpecialIcon />}</ListItemIcon>
        <ListItemText
          children={
            <>
              {t('Channels')}
              <Tooltip title={t('Add Channel')}>
                <IconButton className={classes.addIcon} onClick={handleOpenAddChannelDialog} size="large">
                  <AddCircleOutlineIcon />
                </IconButton>
              </Tooltip>
            </>
          }
        />
      </ListItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <ChannelsList />
      </Collapse>

      <DialogPopUp
        isOpenModal={isAddNewChannel}
        maxWidth={'xs'}
        title={t('Add New Channel')}
        description={t('Please, enter the name of new Channel')}
        closeModal={handleDialogClose}
      >
        <AddNewChannel handleClose={handleDialogClose} activeCompanyId={activeCompanyId} />
      </DialogPopUp>
    </>
  )
}

export default CompanyChannels
