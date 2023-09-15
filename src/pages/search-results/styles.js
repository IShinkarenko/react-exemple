import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flex: 1,
    },
    resultsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: '100px 50px 80px',
      backgroundColor: '#f5f5f5',
    },

    resultsFooter: {
      minHeight: '40px',
    },
  })
)
