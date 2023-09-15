import { Box, Typography } from '@mui/material'
import { isEmpty } from 'lodash'
import React, { memo } from 'react'
import { getTagsByType } from 'utils'

import useStyles from './styles'

const TagsList = ({ title, name, tags }) => {
  const classes = useStyles()
  const tagValues = getTagsByType(tags, name)

  if (isEmpty(tagValues)) {
    return null
  }

  return (
    <Box className={classes.companySpecialties}>
      <Typography className={classes.companySpecialtiesTitle}>{title}</Typography>
      <Typography className={classes.companySpecialtiesList}>
        {tagValues.map(({ label }) => label).join(', ')}
      </Typography>
    </Box>
  )
}

export default memo(TagsList)
