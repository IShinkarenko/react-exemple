import DatePicker from '@mui/lab/DatePicker'
import { Box, Divider, TextField } from '@mui/material'
import { PageHead } from 'components'
import CompanyAnalytics from 'containers/CompanyAnalytics'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'

import useStyles from './styles'

const CompanyAnalitics = () => {
  const { t } = useTranslation('analytics')
  const classes = useStyles()
  const [selectedDate, handleDateChange] = useState(new Date())

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <PageHead
        title="Analytics"
        right={
          <DatePicker
            views={['year', 'month']}
            label={t('Year and Month')}
            minDate={new Date('2010-03-01')}
            maxDate={new Date()}
            value={selectedDate}
            onChange={handleDateChange}
            margin="dense"
            className={classes.datePicker}
            renderInput={(params) => <TextField {...params} helperText={null} variant="standard" />}
          />
        }
      />

      <Divider />

      <CompanyAnalytics />
    </Box>
  )
}

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['analytics', 'companyMenu', 'accountMenu', 'common'])),
  },
})

export default CompanyAnalitics
