import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    companyName: {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      '&:hover': {
        color: '#2d7d80',
      },
    },
    resultItem: {
      border: '1px solid #ddd',
      background: '#fff',
      display: 'flex',
      alignItems: 'flex-start',
      padding: 15,
      borderRadius: 7,
      marginBottom: 20,
      position: 'relative',
      overflow: 'hidden',
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: 45,
        zIndex: '0',
        height: '100%',
        background: '#74d3d1',
      },
      '&:hover': {
        borderColor: '#74d3d1',
      },
    },
    resultItemLogo: {
      marginRight: 30,
      position: 'relative',
      zIndex: 1,
      '@media(max-width: 650px)': {
        '& > div': {
          marginBottom: 0,
        },
      },
    },
    avatar: {
      color: '#333',
      width: 60,
      border: '1px solid #74d3d1',
      cursor: 'pointer',
      height: 60,
      fontSize: 12,
      transition: 'all 0.3s ease',
      marginBottom: 15,
      backgroundColor: '#fff',
      '&:hover': {
        borderColor: '#65a8a7',
      },
    },
    possiblematch: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
      '& > *': {
        fontSize: 12,
      },
      '@media(max-width: 550px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
    },
    description: {
      marginTop: 3,
      color: '#7e7e7e',
    },
    matchTitle: {
      backgroundColor: '#74d3d1eb',
      color: '#fff',
      padding: '1px 7px',
      borderRadius: 5,
      marginLeft: 10,
      fontSize: 10,
      '@media(max-width: 550px)': {
        marginLeft: 0,
        marginTop: 5,
      },
    },
    itemActions: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 15,
      '@media(max-width: 550px)': {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
      },
      '& > span': {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
        cursor: 'pointer',
        fontWeight: 500,
        position: 'relative',
        transition: 'all 0.2s ease',
        padding: '0 2px',
        '&:hover': {
          color: '#2d7d80',
        },
        '@media(max-width: 550px)': {
          flex: '0 0 48%',
          whiteSpace: 'nowrap',
          marginRight: '0',
          marginBottom: 5,
        },
      },
      '& svg': {
        fontSize: 17,
        marginRight: 5,
      },
    },
    dialogContent: {
      backgroundColor: '#F3F6FA',
      padding: 0,
    },
    companyNameLink: {
      color: '#333',
    },
  })
)
