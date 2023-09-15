import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    chipsField: {
      margin: '16px 0',
      display: 'inline-flex',
      '& > div': {
        width: '100%',
      },
    },
    listingFilters: {
      marginRight: 10,
    },
  })
)
