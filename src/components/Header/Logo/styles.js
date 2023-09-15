import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    logoContainer: {
      flex: '0 0 260px',
      '@media(max-width: 550px)': {
        flex: 'unset',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logo: {
      maxHeight: '60px',
      cursor: 'pointer',
    },
  })
)
