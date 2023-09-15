import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    noteTitle: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px',
      '& > div:not(:last-child)': {
        marginRight: '15px',
      },
    },
    noteUserName: {
      marginRight: '10px',
    },
    noteButton: {
      width: 'auto',
      minWidth: 'unset',
      fontSize: '12px',
      textTransform: 'capitalize',
      padding: '2px 7px',
      '& + &': {
        marginLeft: theme.spacing(1),
      },

      '& svg': {
        marginRight: '3px',
      },
    },
    noteListItem: {
      marginTop: 0,
    },
    noteAction: {
      opacity: 0,
      top: 5,
      transform: 'unset',
      transition: 'all 0.2s ease',
    },
    container: {
      alignItems: 'flex-start',
      backgroundColor: 'transparent',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        '& $noteAction': {
          opacity: 1,
        },
      },
    },
    root: {
      alignItems: 'flex-start',
    },
  })
)
