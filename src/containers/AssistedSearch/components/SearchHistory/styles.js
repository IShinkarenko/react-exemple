import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    historyList: {
      '& > *:not(:last-child)': {
        borderBottom: '1px solid #ddd',
      },
    },
  })
)
