import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    card: {
      height: '100%',
    },
    cardHeaderRoot: {
      borderBottom: '1px solid #f4f4f4',
    },
    subheader: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    avatar: {
      color: '#8b8a97',
      width: 60,
      height: 60,
      border: '1px solid #f4f4f4',
      fontSize: 12,
      backgroundColor: '#fff',
      marginBottom: 15,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#65a8a7',
      },
    },
    status: {
      color: '#fff',
      padding: '2px 7px',
      fontSize: 10,
      borderRadius: 3,
      width: 65,
      textAlign: 'center',
    },
    Connected: {
      backgroundColor: '#74d3d1',
    },
    ConnectionPending: {
      backgroundColor: '#FF9500',
    },
    ConnectionRejected: {
      backgroundColor: '#FF3B2F',
    },
    Disconnected: {
      backgroundColor: '#FACD2F',
    },
    Following: {
      backgroundColor: '#5AC8FA',
    },
    cardContent: {
      marginTop: '-46px',
    },
    location: {
      fontSize: 14,
      color: '#B0AEB9',
      fontWeight: 500,
      marginBottom: 3,
    },
    name: {
      fontSize: 19,
      marginBottom: 5,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#65a8a7',
      },
    },
    description: {
      fontSize: 12,
      color: '#737284',
    },
    action: {
      fontSize: 15,
      '& svg': {
        fontSize: 15,
      },
    },
  })
)
