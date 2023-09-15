import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    input: {
      '@media(max-width: 580px)': {
        minWidth: 'unset',
      },
    },
  })
)
