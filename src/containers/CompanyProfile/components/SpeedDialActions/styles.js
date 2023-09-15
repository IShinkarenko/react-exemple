import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    actions: {
      '@media(max-width: 580px)': {
        position: 'absolute',
        marginBottom: '15px !important',
      },
    },
    root: {
      '@media(max-width: 580px)': {
        alignItems: 'flex-end',
      },
    },
  })
)
