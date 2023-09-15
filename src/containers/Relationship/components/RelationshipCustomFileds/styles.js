import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    customTable: {
      paddingLeft: '45px',
      '& td:last-child': {
        paddingLeft: '3px',
      },
    },
    customEditfield: {
      minWidth: 'unset',
    },
    emtyFields: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f6f6f6',
      padding: '32px 0',
      marginTop: 24,
      borderRadius: 5,
      '& svg': {
        fontSize: 17,
        marginRight: 5,
      },
    },
  })
)
