import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    traditionalField: {
      '& > div > div': {
        backgroundColor: '#fff',
        height: 56,
        borderRadius: 30,
      },
    },
  })
)
