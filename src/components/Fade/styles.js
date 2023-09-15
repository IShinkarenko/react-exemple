import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(() =>
  createStyles({
    menu: {
      position: 'absolute',
      right: '-1px',
      zIndex: 1200,
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingRight: '1px',
      display: 'flex',
      flexDirection: 'column',
      width: 'auto',
      minWidth: '100%',
    },
    closed: {
      overflow: 'hidden',
      height: '0',
    },
    open: {
      height: 'auto',
    },
    container: {
      position: 'relative',
    },
  })
)
