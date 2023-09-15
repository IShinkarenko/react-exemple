import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    accordionProgress: {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        marginRight: 15,
      },
    },
    heading: {
      fontSize: 15,
      fontWeight: 500,
      letterSpacing: 0.4,
    },
    secondaryHeading: {
      fontSize: 14,
      opacity: 0.4,
    },

    done: {
      marginRight: 15,
      fontSize: 30,
    },
  })
)
