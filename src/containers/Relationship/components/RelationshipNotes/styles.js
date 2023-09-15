import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    chatWrap: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: 14,
      height: '100%',
    },
    chatTitle: {
      margin: '10px 0',
      padding: '12px 20px',
    },
    chatArea: {
      flex: 1,
      borderRadius: '3px',
      marginBottom: '0px',
      position: 'relative',
      overflow: 'scroll',
      maxHeight: '100%',
      minHeight: 230,
      borderBottom: 0,
    },
    loadMore: {
      transform: 'rotate(-90deg)',
    },
    notesHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(0, 0, 0, 0.07)',
      paddingBottom: 16,
    },
    notesAddBtn: {
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
    notesDialog: {
      padding: 0,
    },
    editor: {
      width: '100%',
      margin: 0,
      '& > div': {
        border: 'none',
        borderRadius: 0,
      },
      '& > div > div:last-child': {
        height: 170,
      },
    },
    emptyNotes: {
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
