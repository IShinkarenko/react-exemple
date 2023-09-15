import AddIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Grid, Typography } from '@mui/material'
import { BaseButton } from 'components'
import { useTranslation } from 'next-i18next'
import React, { memo } from 'react'

import useStyles from './styles'

const Groups = ({ handleGroupSelection, properties }) => {
  const { t } = useTranslation('tags')

  const classes = useStyles()

  const handleGroupSelect = (event, { name, key }) => {
    handleGroupSelection(event, { label: name, value: key })
  }

  return (
    <>
      <Box mt={2}>
        <Typography variant="h6" color="textPrimary" className={classes.groupLabel}>
          {t('Choose Applicable')}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BaseButton
              title={properties.name}
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={(e) => handleGroupSelect(e, properties)}
              className={classes.label}
            />
          </Grid>

          {properties.groups.map((group) => (
            <Grid item xs={12} sm={12} md={12} lg={12} key={group.key}>
              <BaseButton
                title={group.name}
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={(e) => handleGroupSelect(e, group)}
                className={classes.label}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default memo(Groups)
