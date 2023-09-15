import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

const drawerWidth = 260

export default makeStyles((theme) =>
  createStyles({
    sidebarMenu: {
      width: '30%',
      marginTop: '15px',
      background: 'rgb(85, 108, 214)',
      height: '500px',
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
  })
)
