import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    bgText: {
      position: 'absolute',
      transform: 'translate(50%, -50%)',
      zIndex: 2,
      top: '27%',
      right: '50%',

      '@media(max-width: 660px)': {
        top: '29%',
      },
    },
  })
)
