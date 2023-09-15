import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    claimButtons: {
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    signInButton: {
      color: '#fff',
    },
    confirmClaimButton: {
      color: '#fff',
    },
  })
)
