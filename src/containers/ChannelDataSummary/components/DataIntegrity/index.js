import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { rounded } from 'utils'

import useStyles from './styles'

const DataIntegrity = ({ metrics, totalCompanies }) => {
  const { t } = useTranslation('channels')
  const classes = useStyles()

  const labels = {
    ['Identified a website']: t('Identified a website'),
    ['Identified on LinkedIn']: t('Identified on LinkedIn'),
    ['Identified on Facebook']: t('Identified on Facebook'),
    ['Identified on Twitter']: t('Identified on Twitter'),
  }

  return (
    <Box className={classes.dataIntegrity}>
      <Typography variant="h5" className={classes.dataIntegrityTitle}>
        {t('Data Integrity')}
      </Typography>

      <Box>
        <TableContainer component={Paper} className={classes.table} elevation={0}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>{t('Metric')}</TableCell>
                <TableCell align="right">{t('Count')}</TableCell>
                <TableCell align="right">{t('Overall Ecosystem')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metrics.map((row) => {
                const progress = (row.value / totalCompanies) * 100

                return (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {labels[row.name]}
                    </TableCell>
                    <TableCell align="right">{rounded(row.value)}</TableCell>
                    <TableCell align="right">
                      <Box className={classes.progressLine}>
                        <Box style={{ width: `${progress}%` }} className={classes.innerLine}></Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

export default DataIntegrity
