import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    resultsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    resultsHead: {
      display: 'flex',
      marginBottom: 24,
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media(max-width: 650px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    dialogContent: {
      backgroundColor: '#F3F6FA',
      padding: 0,
    },
    searchSkeleton: {
      borderRadius: 15,
    },
    loaderContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    resultsList: {
      width: '100%',
      maxWidth: '75%',
      '@media(max-width: 1150px)': {
        maxWidth: 'unset',
      },
    },
  })
)
