import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    resultsContainer: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: '100px 50px 64px ',
      backgroundColor: '#f5f5f5',
      justifyContent: 'flex-start',
      height: '100%',
    },
    progressbar: {
      width: 125,
      maxWidth: 150,
      marginRight: 24,
      flex: '0 0 125px  ',
    },
    progressWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 30,
      '@media(max-width: 1100px)': {
        flexDirection: 'column',
      },
      '@media(max-width: 767px)': {
        alignItems: 'flex-start',
      },
    },

    progressLeft: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 24,
      flex: 1,
      '@media(max-width: 1100px)': {
        alignItems: 'flex-start',
      },
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    progressTitle: {
      '& h4': {
        marginBottom: 10,
        fontSize: 27,
      },
      '& p': {
        fontSize: 15,
        color: '#545353',
      },
      '@media(max-width: 767px)': {
        margin: '24px 0',
      },
    },
    accordionSummary: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    accordionProgress: {
      display: 'flex',
      alignItems: 'center',
      '& > div': {
        marginRight: 15,
      },
    },
    heading: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.4,
    },
    secondaryHeading: {
      fontSize: 14,
      opacity: 0.4,
    },
    form: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > div': {
        flex: '0 0 48%',
      },
    },
    profileContainer: {
      marginTop: 30,
      marginBottom: 30,
      '& > div': {
        padding: '7px 0',
      },
    },
    expandIcon: {
      fontSize: 14,
      opacity: 0.4,
      '&.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
    },
    completeBtn: {
      color: '#fff',
      fontSize: 14,
      marginTop: 10,
      textTransform: 'capitalize',
      padding: '10px 0',
    },
  })
)
