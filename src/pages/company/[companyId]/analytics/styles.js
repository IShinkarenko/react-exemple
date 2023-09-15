import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    select: {
      width: '200px',
      marginRight: '30px',
      marginBottom: '0px',
      '@media(max-width: 500px)': {
        width: '100%',
        marginBottom: '10px',
      },
    },
    datePicker: {
      '@media(max-width: 500px)': {
        width: '100%',
      },
    },
    chartBox: {
      marginTop: 30,
      width: '100%',
      height: '400px',
      backgroundColor: '#fff',
      borderRadius: 3,
      boxShadow:
        'rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px',
      '& > div': {
        minWidth: '500px',
      },
    },
  })
)
