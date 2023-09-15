import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    list: {
      padding: 0,
    },
    keyContactInner: {
      padding: '15px',
      maxWidth: 350,
    },
    link: {
      color: '#1976d2',
      fontWeight: 'normal',
      '@media(max-width: 767px)': {
        width: 200,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'block',
      },
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
    },
  })
)
