import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import InfoIcon from '@mui/icons-material/Info'
import { Box, Button, Grid, ToggleButton, Typography } from '@mui/material'
import { isEmpty } from 'lodash-es'
import { useTranslation } from 'next-i18next'
import React, { useCallback } from 'react'

import useStyles from './styles'

const ExpandFormSelection = ({
  handleExpandContact,
  handleToggleExpandPannel,
  handleChangeSelection,
  contacts,
  selections,
  credit,
  isCompanyBasic,
}) => {
  const classes = useStyles()
  const { t } = useTranslation('relationships')

  const getContactName = useCallback((contact) => {
    return contact.title ? `${contact.name}, ${contact.title}` : contact.name
  }, [])

  return (
    <>
      <Box mb={5}>
        <Typography variant="subtitle1">
          {t(
            'Expandigo will attempt to update any contacts you have associated with this company and selected below with relevant insights like email address, phone number, and more.'
          )}
        </Typography>
      </Box>
      {isEmpty(contacts) && (
        <Box className={classes.emtyContacts}>
          <InfoIcon />
          <Typography variant="subtitle2">{t('No Contacts')}</Typography>
        </Box>
      )}
      <Box mb={7}>
        <Grid container spacing={1}>
          {(contacts || []).map((contact, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={contact.id}>
              <ToggleButton
                className={classes.contactBtn}
                color="primary"
                selected={selections[index]}
                onChange={() => handleChangeSelection(index)}
                value={contact.id}
              >
                <Box className={classes.contactBtnContainer}>
                  {selections[index] ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                  <Typography color="secondary" variant="subtitle2" className={classes.contactName}>
                    {getContactName(contact)}
                  </Typography>
                  <Typography color="secondary" variant="caption">
                    {contact.providerPersonId ? t('Free') : ''}
                  </Typography>
                </Box>
              </ToggleButton>
            </Grid>
          ))}
        </Grid>
      </Box>
      <hr />
      <Box mt={2}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={4}>
            <Typography color="secondary" variant="h5">
              {t('Expansion Credits')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4}>
                <Typography
                  className={credit.available === credit.maxSpend ? classes.creditItemWarning : classes.creditItem}
                  variant="subtitle2"
                >
                  {t('Max to Spend')}
                </Typography>
                <Typography
                  className={credit.available === credit.maxSpend ? classes.creditItemWarning : classes.creditItem}
                  variant="body1"
                >
                  {credit.maxSpend}
                </Typography>
                <Typography
                  className={credit.available === credit.maxSpend ? classes.creditItemWarning : classes.creditItem}
                  variant="body1"
                >
                  <span className={classes.caption}>{t('From Selections')}</span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  className={credit.available === credit.maxSpend ? classes.creditItemWarning : classes.creditItem}
                  variant="subtitle2"
                >
                  {t('Available')}
                </Typography>
                <Typography
                  className={credit.available === credit.maxSpend ? classes.creditItemWarning : classes.creditItem}
                  variant="body1"
                >
                  {credit.available}
                </Typography>
                <Typography
                  className={credit.available === credit.maxSpend ? classes.creditItemWarning : classes.creditItem}
                  variant="body1"
                >
                  <span className={classes.caption}>
                    {credit.priorUsed} {t('used of')} {credit.creditCount}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography
                  className={credit.overage > 0 ? classes.creditItemAlert : classes.creditItem}
                  variant="subtitle2"
                >
                  {t('Overage')}
                </Typography>
                <Typography
                  className={credit.overage > 0 ? classes.creditItemAlert : classes.creditItem}
                  variant="body1"
                >
                  {credit.overage} x ${credit.price.toFixed(2)} USD
                </Typography>
                <Typography
                  className={credit.overage > 0 ? classes.creditItemAlert : classes.creditItem}
                  variant="body1"
                >
                  <span className={classes.caption}>
                    {isCompanyBasic && credit.overage > 0
                      ? t('Requires Upgrade')
                      : `$${(credit.overage * credit.price).toFixed(2)}`}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box display="flex" justifyContent="flex-end" mt={5}>
        <Button className={classes.actionButton} variant="outlined" onClick={handleToggleExpandPannel}>
          {t('Cancel')}
        </Button>
        <Button
          className={classes.actionButton}
          variant="contained"
          disabled={!selections || selections.filter((f) => f).length === 0 || (isCompanyBasic && credit.overage > 0)}
          type="submit"
          onClick={handleExpandContact}
        >
          {t('Expand')}
        </Button>
      </Box>
    </>
  )
}

export default ExpandFormSelection
