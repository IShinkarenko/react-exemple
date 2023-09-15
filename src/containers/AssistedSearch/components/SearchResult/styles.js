import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    assistedContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      transition: 'all 0.2s ease',
    },
    resultsContainer: {
      width: '100%',
      background: 'transparent',
      boxShadow: 'unset',
    },
    assistedresults: {
      padding: 0,
      width: '100%',
      background: 'transparent',
      '& h3': {
        fontSize: 20,
      },
    },
    resultsWrap: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    resultsAlert: {
      width: '100%',
    },
    traditionalField: {
      padding: 0,
      '& > div > div': {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 15,
        width: 400,
        margin: '24px auto 0',
      },
    },
    searchCriteriasContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      marginTop: 24,
    },
    searchCriteriasTitle: {
      color: '#6e6d7a',
      marginRight: 5,
      fontSize: 32,
    },
    searchCriterias: {
      fontWeight: 700,
      color: '#333',
      fontSize: 32,
    },
    searchCriteriasSubTitle: {
      fontSize: 16,
      color: '#6e6d7a',
      fontWeight: 500,
      marginTop: 7,
    },
  })
)
