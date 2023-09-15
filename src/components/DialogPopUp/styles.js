import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    root: {
      padding: '12px 24px',
      borderTop: '1px solid #ededed',
    },
    dialogTitle: {
      borderBottom: '1px solid #ededed',
      padding: '7px 24px',
      marginBottom: 24,
      '@media(max-width: 767px)': {
        padding: '15px',
      },
    },

    closeButton: {
      position: 'absolute',
      top: 40,
      right: 35,
      zIndex: 100,
    },
  })
)
