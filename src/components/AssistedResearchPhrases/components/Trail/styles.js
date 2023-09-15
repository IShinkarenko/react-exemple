import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    trailText: {
      color: '#fff',
      position: 'relative',
      willChange: 'transform, opacity',
      zIndex: 2,
      overflow: 'hidden',
      fontFamily: 'Montserrat',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'uppercase',
      textShadow: '0px 2px 40px #00000020, 0px 2px 5px #00000030',
      fontSize: 40,
      width: 'auto',
      height: 'auto',
      letterSpacing: 0,
      textAlign: 'center',

      '@media(max-width: 600px)': {
        fontSize: 21,
        height: 30,
      },
    },
    trailsMain: {
      display: 'flex',
      '& > div:not(last-child)': {
        marginRight: 9,
      },
    },
  })
)
