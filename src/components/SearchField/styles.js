import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    companySearch: {
      margin: 0,
      '& input': {
        '&::placeholder': {
          color: '#333',
        },
      },
    },
    resetSearch: {
      cursor: 'pointer',
      fontSize: '20px',
      opacity: 0,
      transition: 'opacity 0.3s ease',
    },
    searchIcon: {
      fontSize: '20px',
    },
    resetSearchVisible: {
      opacity: 0.5,
    },
  })
)
