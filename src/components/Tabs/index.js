import { Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import clsx from 'clsx'
import React, { memo } from 'react'

import useStyles from './styles'

const AppTabs = ({ tabs, activeTab, handleChange, className, tabClassName, isIcon = true, ...rest }) => {
  const classes = useStyles()
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('lg'))

  /* Accessibility */
  const a11yProps = (index) => ({
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  })

  return (
    <Tabs
      value={activeTab}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="tabs"
      variant="fullWidth"
      classes={{ root: clsx(classes.tabs, className), scrollButtons: classes.scrollBtn }}
      {...rest}
    >
      {tabs.map(({ title, icon }, index) => (
        <Tab
          key={title}
          icon={isIcon && isSm ? icon : ''}
          label={isIcon && isSm ? '' : title}
          {...a11yProps(index)}
          className={tabClassName}
        />
      ))}
    </Tabs>
  )
}

export default memo(AppTabs)
