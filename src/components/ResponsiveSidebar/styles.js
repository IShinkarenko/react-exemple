import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

const drawerWidth = 350

export default makeStyles((theme) =>
  createStyles({
    drawer: {
      height: '100%',
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPaper: {
      width: drawerWidth,
      padding: '82px 15px 15px',
      '@media(max-width: 500px)': {
        width: 300,
      },
    },
  })
)
