import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    connectionsTop: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 19,
      padding: '0 1px',
      '@media(max-width: 550px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    connectionTitle: {
      fontSize: 19,
      marginRight: 14,
    },
    topRight: {
      display: 'flex',
      alignItems: 'center',
      '@media(max-width: 550px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 17,
      },
    },
    topleft: {
      display: 'flex',
      alignItems: 'center',
    },
    sortTitle: {
      marginRight: 10,
      lineHeight: 1,
      color: '#7E7C8A',
      '@media(max-width: 550px)': {
        marginBottom: 5,
      },
    },
    sortSelect: {
      width: 150,
      fontSize: 14,
      backgroundColor: '#fff',
      margin: 0,
    },
    connections: {
      flex: 1,
      padding: '0 1px',
    },
    section: {
      border: '1px solid #ebe7e7',
      marginBottom: 24,
      backgroundColor: '#fff',
      padding: 24,
      borderRadius: 3,
    },
    sectionTitle: {
      fontSize: 17,
      color: '#7E7C8A',
      fontWeight: 400,
    },
    notFound: {
      background: '#fff',
      textAlign: 'center',
      padding: 24,
      border: '1px solid #ddd',
      borderRadius: 3,
      marginTop: 50,
    },
    progress: {
      padding: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    },

    inputRoot: {
      color: 'inherit',
      height: 40,
    },
    notFoundTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      width: '100%',
    },
    searchField: {
      padding: '0px',
      background: '#fff',
      '& > div > div': {
        backgroundColor: '#fff',
        height: 'auto',
        borderRadius: 5,
      },
    },
    suggestedConnections: {
      padding: 0,
      margin: '0 14px',
      background: 'transparent',
    },
  })
)
