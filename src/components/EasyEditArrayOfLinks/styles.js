import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    launchIcon: {
      fontSize: '15px',
    },
    copyIcon: {
      fontSize: '15px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    link: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '14px',
    },
    addButton: {
      minWidth: 'unset',
      textTransform: 'capitalize',
      boxShadow: 'none',
      color: '#fff',
      fontSize: 14,
    },
    wrapper: {
      display: 'flex',
      marginTop: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    links: {
      margin: 0,
      padding: 0,
      marginLeft: 20,
      listStyle: 'none',
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
  })
)
