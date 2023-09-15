import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    statusCell: {
      display: 'flex',
      alignItems: 'center',
    },
    indicator: ({ isDisabled }) => ({
      display: 'block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: isDisabled ? 'red' : 'green',
      marginRight: '5px',
    }),
    icon: {
      padding: '3px',
    },
    membersHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 24px',
    },
    searchField: {
      padding: '0px',
      background: '#fff',
      width: 180,
      '& > div > div': {
        backgroundColor: '#fff',
        height: 'auto',
        borderRadius: 5,
      },
    },
  })
)
