import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    header: {
      maxWidth: '100vw',
      display: 'flex',
      alignItems: 'center',
      marginBottom: 24,
      '@media(max-width: 650px)': {
        padding: '24px 0',
        flexDirection: 'column',
      },
    },
    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      flex: 1,
      '&:last-child': {
        marginBottom: 0,
      },
      [theme.breakpoints.up('md')]: {
        marginBottom: 0,
      },
    },
    backBtn: {
      margin: theme.spacing(0, 1.5, 0, 0),
    },
    title: {
      position: 'relative',
      display: 'flex',
      wordBreak: 'break-word',
      '@media(max-width: 650px)': {
        fontSize: 24,
        margin: '0 0 14px 0',
      },
    },
    headerLeft: {
      flex: 1,
      marginBottom: theme.spacing(3),
      '&:last-child': {
        marginBottom: 0,
      },
      [theme.breakpoints.up('md')]: {
        display: 'flex',
        alignItems: 'center',
        flex: '1 1 auto',
        marginBottom: 0,
        marginLeft: theme.spacing(3),
      },
    },
    headerRight: {
      flex: 0.5,
      '@media(max-width: 650px)': {
        width: '100%',
        flex: 1,
      },
      '& > button + button': {
        marginTop: theme.spacing(2),
      },
    },
  })
)
