import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    notesEditor: {
      position: 'relative',
      width: '95%',
      margin: '0 auto 15px',
    },
    submitNote: {
      position: 'absolute',
      right: 14,
      bottom: 14,
      zIndex: 1,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: theme.palette.primary.main,
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
  })
)
