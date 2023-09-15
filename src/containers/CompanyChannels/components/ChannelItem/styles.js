import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    link: {
      color: '#1976d2',
      display: 'inline-block',
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  })
)
