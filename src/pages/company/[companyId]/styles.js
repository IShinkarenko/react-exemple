import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    companyContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    noChannelContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
)
