import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    boxBtn: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '30px',
    },
  })
)
