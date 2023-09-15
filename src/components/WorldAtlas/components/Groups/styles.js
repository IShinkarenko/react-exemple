import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    label: {
      justifyContent: 'flex-start',
      textAlign: 'left',
      width: '100%',
      textTransform: 'capitalize',
    },
    groupLabel: {
      fontSize: '21px',
      fontWeight: 400,
      marginBottom: 15,
      textAlign: 'center',
    },
  })
)
