import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    btn: {
      minWidth: '136px',
      '& + &': {
        marginLeft: theme.spacing(3),
      },
    },
    mainAuthContainer: {
      padding: theme.spacing(4.8),
    },
    container: {
      marginTop: theme.spacing(2),
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    steps: {
      padding: theme.spacing(0, 6.8),
      [theme.breakpoints.down('xl')]: {
        padding: 0,
      },
    },
    stepsContainer: {
      height: '100%',
      padding: '0 15px 15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xl')]: {
        padding: theme.spacing(4.8, 3),
      },
    },
  })
)
