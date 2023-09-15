import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    keyContact: {
      // margin: '14px 0',
    },
    list: {
      padding: 0,
    },
    keyContactInner: {
      padding: '15px',
      // boxShadow: 'none',
      border: '1px solid rgba(0, 0, 0, 0.07)',
    },
    link: {
      color: '#1976d2',
      fontWeight: 'normal',
    },
    email: {
      fontWeight: 'normal',
      color: '#1976d2',
      display: 'block',
    },
    listItem: {
      padding: '5px 0',
    },
    keyContactHead: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px',
      justifyContent: 'space-between',
    },
    keyContactName: {
      marginLeft: '15px',
      fontSize: 14,
    },
    keyContactHeadInner: {
      display: 'flex',
      alignItems: 'center',
    },
  })
)
