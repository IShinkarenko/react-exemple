import CheckIcon from '@mui/icons-material/Check'
import { Avatar, Box, ListItem } from '@mui/material'
import clsx from 'clsx'
import React, { memo } from 'react'
import { capitalizeFirstLetters } from 'utils'

import useStyles from './styles'

const CompanyItem = ({ companyId, companyName, companyStatus, logoUrl, handleChangeCompany, currentCompanyId }) => {
  const classes = useStyles()
  const abbreviation = capitalizeFirstLetters(companyName)

  const isPending = companyStatus === 'PendingVerification'
  const isSelected = currentCompanyId === companyId

  const handleClick = () => {
    if (isPending) {
      return
    }

    handleChangeCompany(companyId)
  }

  return (
    <ListItem key={companyId} className={classes.companyItem} onClick={handleClick} selected={isSelected}>
      {isSelected && <CheckIcon className={classes.activeCompany} />}

      <Box className={clsx(classes.logoWrap, isPending && classes.companyItemDisabled)}>
        <Avatar src={logoUrl} className={classes.small}>
          {abbreviation}
        </Avatar>
        <span>{companyName}</span>
      </Box>

      {isPending && <span className={classes.pendingStatus}>Pending</span>}
    </ListItem>
  )
}

export default memo(CompanyItem)
