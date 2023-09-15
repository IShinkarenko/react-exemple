import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    tabs: {
      borderBottom: 'none',
      alignItems: 'center',
    },
    scrollBtn: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      margin: '0 3px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
  })
)
