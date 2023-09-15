import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { IconButton } from '@mui/material'
import usePagination from '@mui/material/usePagination'
import clsx from 'clsx'
import React, { memo, useCallback } from 'react'

import useStyles from './styles'

const Pagination = ({ pages, paginate }) => {
  const classes = useStyles()

  const { items } = usePagination({
    count: pages,
  })

  const handlePaginate = useCallback(
    (page) => {
      paginate(page)
    },
    [paginate]
  )

  return (
    <ul className={classes.pagination}>
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null

        if (type === 'start-ellipsis' || type === 'end-ellipsis') {
          children = '…'
        } else if (type === 'page') {
          children = (
            <IconButton
              {...item}
              size="small"
              type="button"
              className={clsx(classes.paginationItem, selected && classes.paginationItemSelected)}
            >
              {page}
            </IconButton>
          )
        } else {
          children = (
            <IconButton {...item} size="small" type="button">
              {type === 'previous' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          )
        }

        return (
          <li key={index} onClick={() => handlePaginate(page)}>
            {children}
          </li>
        )
      })}
    </ul>
  )
}

export default memo(Pagination)
