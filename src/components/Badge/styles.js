import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    badge: {
      width: '8px',
      height: '8px',
      marginLeft: '15px',
      borderRadius: '50%',
      '@media(max-width: 700px)': {
        margin: '0 auto',
      },
    },
  })
)
