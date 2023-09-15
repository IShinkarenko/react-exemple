import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    pagination: {
      margin: 0,
      display: 'flex',
      padding: 0,
      flexWrap: 'wrap',
      listStyle: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 14,
      width: '75%',
      '@media(max-width: 600px)': {
        width: '100%',
      },
    },
    paginationItem: {
      color: 'rgba(0, 0, 0, 0.87)',
      height: 32,
      margin: '0 3px',
      padding: '0 6px',
      fontSize: '0.875rem',
      minWidth: 32,
      boxSizing: 'border-box',
      textAlign: 'center',
      fontWeight: 400,
      lineHeight: 1.43,
      borderRadius: 16,
      letterSpacing: '0.01071em',
    },
    paginationItemSelected: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      fontWeight: 'bold',
    },
  })
)
