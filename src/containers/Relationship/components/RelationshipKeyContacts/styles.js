import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    keyContactsWrapper: {
      padding: 14,
    },
    keyContactsHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
      paddingBottom: 16,
    },
    keyContactsAddBtn: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: 'transparent',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
      },
      '& svg': {
        fontSize: 19,
      },
    },
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
    keyContactsList: {
      marginTop: 14,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: '1fr',
      gap: '14px',
      '@media(max-width: 1440px)': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
)
