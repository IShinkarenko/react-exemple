import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    mainContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      backgroundColor: '#f9f9fc',
      width: 'calc(100% - 260px)',
    },
    main: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      overflow: 'auto',
      padding: '2vw',
    },
    unauthorizedMainContainer: {
      padding: 0,
    },
  })
)
