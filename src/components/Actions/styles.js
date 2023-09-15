import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    menuItem: {
      '@media(max-width: 700px)': {
        fontSize: '14px',
        minHeight: 'unset',
      },
    },
  })
)
