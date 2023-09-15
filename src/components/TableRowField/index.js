import { TableCell, TableRow, Typography } from '@mui/material'
import clsx from 'clsx'
import React from 'react'

import useStyles from './styles'

const TableRowField = ({
  title,
  children,
  variant = 'h6',
  align = 'left',
  className,
  cellClassName,
  cellBodyClassName,
}) => {
  const classes = useStyles()

  return (
    <TableRow className={clsx(classes.rowRoot, className)} role="row">
      <TableCell align={align} size="small" className={clsx(classes.tableTitle, cellClassName)}>
        <Typography variant={variant} color="inherit" className={classes.title}>
          {title}
        </Typography>
      </TableCell>
      <TableCell align={'left'} className={clsx(classes.tableData, cellBodyClassName)}>
        {children && children}
      </TableCell>
    </TableRow>
  )
}

export default TableRowField
