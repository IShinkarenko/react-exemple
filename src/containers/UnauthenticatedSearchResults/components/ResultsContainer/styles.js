import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    unauthenticatedResults: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    resultsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: '24px 4vw 80px',
      marginTop: 30,
    },
    resultsAlert: {
      padding: '100px 4vw 80px',
    },
    dialogCount: {
      fontSize: 14,
      lineHeight: 1,
    },
    dialogCounterNumber: {
      fontSize: 30,
      margin: '10px 0',
      color: '#333',
      fontWeight: 600,
    },
    dialogCounter: {
      marginTop: 14,
    },
    loadingDialogContent: {
      position: 'absolute',
      top: '50%',
      transform: 'translate(50%, -50%)',
      right: '50%',
      width: '65%',
      background: 'rgba(255,255,255,.7)',
      textAlign: 'center',
      '@media(max-width: 600px)': {
        width: '85%',
      },
      '@media(max-width: 450px)': {
        position: 'static',
        transform: 'unset',
        width: '100%',
      },
    },
    paperWidthMd: {
      maxWidth: 650,
    },
    loadingDialogTitle: {
      '@media(max-width: 600px)': {
        '& h2': {
          fontSize: 14,
        },
      },
    },
    searchTextAgain: {
      background: '#f4f4f4',
      margin: '-24px',
      position: 'relative',
      height: 70,
    },
    searchTextAgainInput: {
      padding: 0,
      width: '50%',
      position: 'absolute',
      bottom: '-25px',
      transform: 'translate(50%, 0)',
      right: '50%',
      '& > div > div': {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 15,
      },
    },
    resultsSubHeader: {
      margin: '24px 0 32px 0',
      textAlign: 'center',
      '& h4': {
        color: '#6e6d7a',
      },
    },
    searchCriteriasContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
      fontSize: 19,
      fontWeight: 500,
      marginTop: 7,
    },
    resultInner: {
      flex: 1,
      padding: '14px 2vw 64px 2vw',
    },
  })
)
