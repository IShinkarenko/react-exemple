import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
    },
    resultsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: '70px 0px 0px',
      backgroundColor: '#f9f9fc',
      height: 'calc(100% - 50px)',
      backgroundColor: '#fff',
      width: 'calc(100% - 350px)',
    },
    resultsFooter: {
      minHeight: '40px',
    },
  })
)
