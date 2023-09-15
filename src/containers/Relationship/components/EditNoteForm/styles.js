import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
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
    editTextFiled: {
      width: '100%',
    },
  })
)
