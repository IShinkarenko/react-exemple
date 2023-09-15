import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    authWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: '100%',
      paddingTop: 32,
      paddingBottom: 32,
      overflowY: 'auto',
    },
    authContainer: {
      backgroundColor: '#fff',
      border: '1px solid #e5e5e5',
      borderRadius: 3,
      margin: 'auto',
      '& > form': {
        padding: 40,
        width: 460,
        '@media(max-width: 580px)': {
          padding: 0,
        },
      },
      '@media(max-width: 580px)': {
        width: '90%',
        padding: '40px 15px',
      },
    },
  })
)
