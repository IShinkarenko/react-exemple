import { Drawer } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'

import SidebarMenu from './components/SidebarMenu'
import useStyles from './styles'

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          sx={{ display: { xs: 'block', md: 'none', '& .MuiDrawer-paper': { width: 260 } } }}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <SidebarMenu />
        </Drawer>

        <Drawer
          sx={{
            display: { xs: 'none', md: 'block', '& .MuiDrawer-paper': { width: 260 } },
          }}
          variant="permanent"
          open
        >
          <SidebarMenu />
        </Drawer>
      </nav>
    </>
  )
}

export default Sidebar
