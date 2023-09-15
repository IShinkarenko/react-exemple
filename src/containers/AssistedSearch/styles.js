import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    container: {
      flex: 1,
      '& > div': {
        height: '100%',
      },
    },
    head: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'auto',
      flexShrink: 0,
      padding: '0 5px',
    },
    tabPanelRoot: {
      overflow: 'hidden',
    },
  })
)
