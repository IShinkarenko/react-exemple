import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 800,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(5),
    },
    smartChip: {
      display: 'flex',
      margin: '5px',
      '& > *:nth-child(1)': {
        order: 2,
        marginRight: 15,
        marginLeft: 0,
        fontSize: '17px',
      },
      '& > *:nth-child(2)': {
        order: 1,
      },
      '& > *:nth-child(3)': {
        order: 3,
      },
    },
  })
)
