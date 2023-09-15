import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import React, { memo } from 'react'

import useStyles from './styles'

const LinkItem = ({ linkTitle, itemIcon, className, redirectTo, nested, id, children, disabled, ...rest }) => {
  const {
    query: { channelId, pageId },
    pathname,
  } = useRouter()

  const isActive = channelId ? channelId === id : pageId ? pageId === id : pathname === redirectTo.pathname
  const classes = useStyles({ isActive })

  return (
    <Link href={redirectTo} {...rest} passHref={true}>
      <ListItem button className={clsx(className, classes.link, nested && classes.nested)} disabled={disabled}>
        {itemIcon && <ListItemIcon>{itemIcon}</ListItemIcon>}

        {<ListItemText primary={linkTitle} />}

        {children}
      </ListItem>
    </Link>
  )
}

LinkItem.propTypes = {
  linkTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  itemIcon: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  redirectTo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  nested: PropTypes.bool,
  as: PropTypes.string,
  id: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
}

export default memo(LinkItem)
