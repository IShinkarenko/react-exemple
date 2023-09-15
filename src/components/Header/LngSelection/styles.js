import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    lngLink: {
      '& a': {
        color: '#333',
      },
    },
  })
)
