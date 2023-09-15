import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    relationshipContainer: {
      position: 'relative',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    relationshipProfile: {
      display: 'flex',
      flex: 1,
      width: '100%',
      gap: 14,
      position: 'relative',
      '@media(max-width: 1200px)': {
        flexWrap: 'wrap',
      },
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    middle: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    middleTop: {
      backgroundColor: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.13)',
      borderRadius: 3,
      marginBottom: 14,
      flex: 0.7,
    },
    middleBottom: {
      backgroundColor: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.13)',
      borderRadius: 3,
      flex: 1,
    },
    right: {
      flex: '0 0 20vw',
      backgroundColor: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.13)',
      borderRadius: 3,
      '@media(max-width: 1200px)': {
        width: '100%',
        flex: 'unset',
      },
    },
    relationshipHeader: {
      '@media(max-width: 650px)': {
        alignItems: 'flex-start',
        '& h3': {
          margin: 0,
        },
      },
    },
    relationshipBackIcon: {
      position: 'relative',
      display: 'flex',
    },
    relationshipHeadButtons: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      '@media(max-width: 650px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },

    connectButton: {
      textTransform: 'capitalize',
      fontSize: 12,
      height: 'auto',
      minHeight: 'unset',
      padding: '4px 8px',
      boxShadow: 'unset',
      marginLeft: 24,
    },
    subtitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 14,
    },

    sourceType: {
      color: '#fff',
      borderRadius: 3,
      padding: '0px 5px',
    },
    Inbound: {
      background: '#d8e4ee',
      color: '#333',
    },
    Import: {
      background: '#95c5ee',
      color: '#333',
    },
    ManualEntry: {
      background: '#7f98c9',
    },
    contactHeading: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      marginBottom: '14px',
      '@media(max-width: 650px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
  })
)
