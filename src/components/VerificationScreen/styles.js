import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    verificationContainer: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    verificationInner: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 550,
      marginBottom: 100,
    },
    verificationTitle: {
      marginTop: 50,
      marginBottom: 24,
      textAlign: 'center',
    },
    verificationButton: {
      minWidth: 'unset',
      marginTop: 38,
      color: '#fff',
      boxShadow: 'unset',
      padding: '14px 24px',
      textTransform: 'CAPITALIZE',
    },
  })
)
