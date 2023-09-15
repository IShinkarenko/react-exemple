import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer - 1,
      color: '#fff',
      position: 'absolute',
      backgroundColor: '#f9f9fc',
    },
  })
)
