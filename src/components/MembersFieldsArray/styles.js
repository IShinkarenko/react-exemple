import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    addButton: {
      padding: '2px 7px',
    },
    fieldArray: {
      display: 'flex',
      alignItems: 'flex-start',
      '& > div': {
        margin: '0 15px 15px 0',
      },
    },
    removeButton: {
      marginLeft: '5px',
    },
  })
)
