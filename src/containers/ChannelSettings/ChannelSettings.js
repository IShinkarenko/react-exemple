import { Paper, Typography } from '@mui/material'
import { EasyEditChipSelect, InfoItem } from 'components'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const ChannelSettings = ({ tags, handleChange }) => {
  const { t } = useTranslation(['channels', 'common'])
  const router = useRouter()
  const classes = useStyles()
  const optionsBasePath = `/static/locales/${router.locale}/lists`

  const onHandleSave = useCallback(
    (data) => {
      handleChange(data)
    },
    [handleChange]
  )

  return (
    <Paper className={classes.channelSettingsContainer}>
      <Typography variant="h4">{t('Setup a Channel')}</Typography>
      <Typography className={classes.channelSettingsDescr}>
        {t(
          'Channels are like “saved searches” and provide a window into the data ecosystem where company connections are made. Describe a company, division, or business unit of interest below to visualize its ecosystem and to receive suggestions for business expansion.'
        )}
      </Typography>

      <InfoItem
        title={t('Current Sector Keywords')}
        text={
          <EasyEditChipSelect
            tags={tags}
            name={'OperatingSector'}
            json={`${optionsBasePath}/sectors.json`}
            handleSave={onHandleSave}
            displayCmpClass={classes.itemValue}
            disableAutoSubmit={true}
            maxWidth={'750px'}
          />
        }
        direction={'column'}
        className={classes.channelSettingField}
      />

      <InfoItem
        title={t('Growth Sector Keywords')}
        text={
          <EasyEditChipSelect
            tags={tags}
            name={'DesiredSector'}
            json={`${optionsBasePath}/sectors.json`}
            handleSave={onHandleSave}
            displayCmpClass={classes.itemValue}
            disableAutoSubmit={true}
            maxWidth={'750px'}
          />
        }
        direction={'column'}
        className={classes.channelSettingField}
      />

      <InfoItem
        title={t('Current Markets')}
        text={
          <EasyEditChipSelect
            tags={tags}
            name={'OperatingMarket'}
            handleSave={onHandleSave}
            displayCmpClass={classes.itemValue}
            disableAutoSubmit={true}
            maxWidth={'750px'}
          />
        }
        direction={'column'}
        className={classes.channelSettingField}
      />

      <InfoItem
        title={t('Desired Markets')}
        text={
          <EasyEditChipSelect
            tags={tags}
            name={'DesiredMarket'}
            handleSave={onHandleSave}
            displayCmpClass={classes.itemValue}
            disableAutoSubmit={true}
            maxWidth={'750px'}
          />
        }
        direction={'column'}
        className={classes.channelSettingField}
      />

      <InfoItem
        title={t('Strategic Objectives')}
        text={
          <EasyEditChipSelect
            tags={tags}
            name={'DesiredObjective'}
            json={`${optionsBasePath}/objectives.json`}
            handleSave={onHandleSave}
            displayCmpClass={classes.itemValue}
            disableAutoSubmit={true}
            freeSolo={false}
            maxWidth={'750px'}
          />
        }
        direction={'column'}
        className={classes.channelSettingField}
      />

      {/* <InfoItem
        title={t('Keywords')}
        text={
          <EasyEditChipSelect
            tags={tags}
            name={'Keyword'}
            json={`${optionsBasePath}/keywords.json`}
            handleSave={onHandleSave}
            displayCmpClass={classes.itemValue}
            disableAutoSubmit={true}
          />
        }
        direction={'column'}
        className={classes.channelSettingField}
      /> */}
    </Paper>
  )
}

export default memo(ChannelSettings)
