import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    particles: {
      height: '400px',
      width: '100%',
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
  })
)
