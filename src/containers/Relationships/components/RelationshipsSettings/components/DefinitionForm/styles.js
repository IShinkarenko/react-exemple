import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    radioButton: {
      border: '1px solid #ddd',
      paddingRight: '18px',
      minWidth: 160,
      margin: '5px 10px 5px 0',
      marginLeft: '0px',
      marginRight: '10px',
      borderRadius: '4px',
      '& > span:last-child': {
        fontSize: '14px',
      },
    },
    radioLabel: {
      borderLeft: '4px solid rgba(0, 0, 0, 0.23)',
      padding: '5px 0 5px 15px',
    },
    numbers: {
      display: 'flex',
      '& > *': {
        flex: 1,
      },
    },
  })
)
