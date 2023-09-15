import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    drawerPaper: {
      zIndex: '1500',
    },
    circle: {
      width: 27,
      height: 27,
    },
    loadMore: {
      transform: 'rotate(90deg)',
    },
  })
)
