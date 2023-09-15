import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    tooltip: {
      fontSize: '15px',
      position: 'relative',
    },
    launchIcon: {
      position: 'absolute',
    },
    dashed: {
      borderBottom: '1px dashed #ddd',
      paddingBottom: 4,
    },
  })
)
