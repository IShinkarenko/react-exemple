import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    footer: {
      position: 'fixed',
      backgroundColor: '#fff',
      color: '#000',
      top: 'auto',
      bottom: 0,
      width: '100%',
      zIndex: theme.zIndex.drawer - 1,
      borderTop: '1px solid #e5e5e5',
      height: 50,
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        padding: '0 24px',
      },
      '@media(max-width: 899px)': {
        left: 0,
      },
    },
  })
)
