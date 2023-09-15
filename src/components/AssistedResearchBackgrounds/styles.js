import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    bgWrap: {
      position: 'absolute',
      height: '100vh',
      width: '100%',
      right: 0,
      overflow: 'hidden',
      zIndex: '-1',
    },
    bgImages: {
      backgroundSize: 'cover',
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  })
)
