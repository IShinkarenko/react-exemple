import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    form: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      '& > div': {
        flex: '0 0 48%',
        margin: '8px 0',
      },
      '@media(max-width: 767px)': {
        flexDirection: 'column',
        '& > div': {
          flex: 1,
        },
      },
    },
  })
)
