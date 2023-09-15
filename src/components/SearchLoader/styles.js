import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    particles: {
      height: '300px',
    },
    dialogCount: {
      fontSize: 14,
      lineHeight: 1,
    },
    dialogCounterNumber: {
      fontSize: 30,
      margin: '10px 0',
      color: '#333',
      fontWeight: 600,
    },
    dialogCounter: {
      marginTop: 14,
    },
    loadingDialogContent: {
      position: 'absolute',
      top: '50%',
      transform: 'translate(50%, -50%)',
      right: '50%',
      width: '65%',
      background: 'rgba(255,255,255,.7)',
      textAlign: 'center',
      '@media(max-width: 600px)': {
        width: '85%',
      },
      '@media(max-width: 450px)': {
        position: 'static',
        transform: 'unset',
        width: '100%',
      },
    },
    loadingDialogTitle: {
      '@media(max-width: 600px)': {
        '& h2': {
          fontSize: 14,
        },
      },
    },
  })
)
