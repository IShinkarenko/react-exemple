import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    removeButton: {
      marginRight: 10,
      '& svg': {
        fontSize: '20px',
      },
    },
    editWrapper: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
  })
)
