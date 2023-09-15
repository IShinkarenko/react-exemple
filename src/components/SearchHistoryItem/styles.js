import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    details: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    title: {
      textTransform: 'capitalize',
    },
    historyTag: {
      backgroundColor: theme.palette.primary.main,
      padding: '2px 4px',
      borderRadius: 5,
      color: '#fff',
      marginLeft: 3,
    },
  })
)
