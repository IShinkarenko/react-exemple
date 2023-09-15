import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    headerMenu: {
      minWidth: '260px',
      padding: '0',
    },
    menuSection: {
      backgroundColor: '#f6f6f6',
      outline: 'none',
    },
    menuItem: {
      padding: '3px 16px',
      '& span': {
        fontSize: '15px',
      },
      '& svg': {
        fontSize: '20px',
      },
    },
    user: {
      width: 35,
      height: 35,
      border: '1px solid #f3f0f0',
      cursor: 'pointer',
      marginLeft: '7px',
    },
  })
)
