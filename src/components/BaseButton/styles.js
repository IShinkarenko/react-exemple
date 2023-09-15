import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    button: {
      minWidth: '136px',
      '@media(max-width: 550px)': {
        minWidth: '100px',
      },
      '& + &': {
        marginLeft: theme.spacing(3),
      },
    },
    default: {
      minWidth: 'unset',
      textTransform: 'capitalize',
      padding: '0 3px',
      '& + &': {
        marginLeft: 0,
      },
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  })
)
