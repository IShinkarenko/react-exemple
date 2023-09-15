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
      position: 'relative',
    },
    steps: {
      padding: theme.spacing(0, 6.8),
      [theme.breakpoints.down('xl')]: {
        padding: 0,
      },
    },
    newCompanyStepsContainer: {
      height: '100%',
      padding: '0 15px 15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    buttonsGroup: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    newCompanyStepper: {
      [theme.breakpoints.down('xl')]: {
        padding: 24,
        width: '100%',
        maxWidth: 'unset',
      },
    },
  })
)
