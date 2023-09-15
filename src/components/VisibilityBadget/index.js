import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import EditIcon from '@mui/icons-material/Edit'
import { Box, Tooltip } from '@mui/material'
import { sectionLevels } from 'constant'
import { useTranslation } from 'next-i18next'
import React, { memo } from 'react'

import useStyles from './styles'

const VisibilityBadget = ({ visibilityLevel, handleClick, className, isDropDown }) => {
  const { t } = useTranslation('common')
  const classes = useStyles({ visibilityLevel })

  return (
    <Tooltip title={<EditIcon className={classes.tooltip} />} placement={'left'} arrow>
      <Box
        className={className}
        onClick={handleClick}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'flex-start'}
      >
        <Box className={classes.badget}></Box>

        <Box>
          <span>{t(`${sectionLevels[visibilityLevel]}`)}</span>
        </Box>

        {isDropDown && <ArrowDropDownIcon color="secondary" />}
      </Box>
    </Tooltip>
  )
}

export default memo(VisibilityBadget)
