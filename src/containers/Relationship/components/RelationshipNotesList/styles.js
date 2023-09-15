import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    chatWrap: {
      display: 'flex',
      flexDirection: 'column',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: '17px 0 0',
    },
    subheader: {
      display: 'flex',
      justifyContent: 'center',
    },
    subheaderInner: {
      minWidth: 120,
      background: '#f6f6f6',
      borderRadius: 50,
      lineHeight: 1,
      padding: 5,
      margin: 5,
      fontSize: '12px',
      textAlign: 'center',
    },
  })
)
