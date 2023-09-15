import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    pie: {
      height: 350,
      display: 'flex',
      flex: 1,
      position: 'relative',
      '& svg': {
        width: '100%',
      },
    },
    pieChartTitle: {
      fontWeight: 600,
      marginBottom: 24,
      textAlign: 'center',
      padding: '24px 24px 0',
    },
  })
)
