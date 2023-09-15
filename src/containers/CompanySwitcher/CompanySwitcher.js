import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Badge, Box, Divider, Skeleton, Typography } from '@mui/material'
import { SingleListItem } from 'components'
import { EXPANDIGO_BASIC } from 'constant'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'

import CompanySwitcherList from './components/CompanySwitcherList'
import useStyles from './styles'

const CompanySwitcher = ({ company: currentCompany, userId }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const isBasic = currentCompany?.subscriptionLevel === EXPANDIGO_BASIC
  const icon = isBasic ? 'freeLevelIcon' : 'paidLevelIcon'

  const handleShowSwitcher = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <>
      {currentCompany ? (
        <SingleListItem
          itemText={
            <Box display="flex" alignItems="center" justifyContent={'space-between'}>
              <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                <Badge
                  badgeContent={<Image width={12} height={12} alt="Expandigo Basic" src={`/static/${icon}.svg`} />}
                >
                  <Typography variant="body" lineHeight={1} sx={{ pr: '5px' }}>
                    {currentCompany?.name}
                  </Typography>
                </Badge>
              </Box>

              <ArrowDropDownIcon />
            </Box>
          }
          disableTypography={true}
          className={classes.companyTitle}
          handleClick={handleShowSwitcher}
        />
      ) : (
        <Box display="flex" justifyContent="center">
          <Skeleton variant="text" height="50px" width="80%" />
        </Box>
      )}

      {anchorEl && (
        <CompanySwitcherList
          userId={userId}
          anchorEl={anchorEl}
          handleClose={handleClose}
          currentCompanyId={currentCompany?.id}
          subscriptionLevel={currentCompany?.subscriptionLevel}
        />
      )}

      <Divider />
    </>
  )
}

export default CompanySwitcher
