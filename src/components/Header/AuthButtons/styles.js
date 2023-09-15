import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    authButton: {
      minWidth: 'unset',
      '& + &': {
        marginLeft: theme.spacing(1),
      },
    },
  })
)
