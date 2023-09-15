import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    searchAgainWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingBottom: 35,
      marginTop: 24,
      transition: 'all 0.15s ease',
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    searchAgain: {
      width: '200px',
      fontFamily: 'Montserrat, sans-serif',
      letterSpacing: 0,
      borderRadius: 7,
      textTransform: 'capitalize',
    },
    searchAgainWrapActive: {
      padding: '0px 24px 5px',
    },
    searchAgainDefault: {
      transition: 'all 0.3s ease',
      maxWidth: 1070,
    },
    searchAgainExpanded: {
      backgroundColor: '#fff',
      borderRadius: 4,
      marginBottom: 35,
      marginTop: 24,
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    infoBox: {
      background: '#74d3d11f',
      padding: 24,
      borderRadius: 7,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      marginRight: 50,
      '& svg': {
        marginRight: 15,
        color: '#74d3d1',
      },
      '& p': {
        color: '#333',
        fontSize: 13,
      },
      '@media(max-width: 767px)': {
        marginRight: 0,
        marginBottom: 14,
      },
    },
    filtersArea: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 24,
      '& > div': {
        width: '49%',
        margin: '5px 0',
        '@media(max-width: 767px)': {
          width: '100%',
        },
      },
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
  })
)
