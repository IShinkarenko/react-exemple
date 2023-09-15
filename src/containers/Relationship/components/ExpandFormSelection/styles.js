import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    emtyContacts: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f6f6f6',
      padding: '32px 0',
      marginTop: 24,
      borderRadius: 5,
      '& svg': {
        fontSize: 17,
        marginRight: 5,
      },
    },
    contactBtn: {
      width: '100%',
    },
    contactName: {
      textTransform: 'none',
    },
    contactBtnContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
    creditItem: {
      textAlign: 'center',
      color: theme.palette.secondary.main,
      '@media(max-width: 600px)': {
        textAlign: 'left',
      },
    },
    creditItemWarning: {
      textAlign: 'center',
      color: theme.palette.warning.main,
      '@media(max-width: 600px)': {
        textAlign: 'left',
      },
    },
    creditItemAlert: {
      textAlign: 'center',
      color: theme.palette.error.main,
      '@media(max-width: 600px)': {
        textAlign: 'left',
      },
    },
    caption: {
      fontSize: 12,
    },
    actionButton: {
      margin: 5,
    },
  })
)
