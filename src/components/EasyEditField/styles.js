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
  })
)
