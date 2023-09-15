import { Drawer } from '@mui/material'
import React from 'react'

import useStyles from './styles'

const ResponsiveSidebar = ({ window, handleDrawerToggle, mobileOpen, children, width = 260 }) => {
  const classes = useStyles()
  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <nav className={classes.drawer} aria-label="folders">
      <Drawer
        container={container}
        variant="temporary"
        anchor={'left'}
        open={mobileOpen}
        onClose={handleDrawerToggle}
        classes={{
          paper: classes.drawerPaper,
        }}
        sx={{ display: { xs: 'block', md: 'none', '& .MuiDrawer-paper': { width } } }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {children}
      </Drawer>

      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        sx={{
          display: { xs: 'none', md: 'block', '& .MuiDrawer-paper': { width } },
        }}
        variant="permanent"
        open
      >
        {children}
      </Drawer>
    </nav>
  )
}

export default ResponsiveSidebar
