import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    tableTitle: {
      width: '160px',
      whiteSpace: 'nowrap',
      color: '#000',
      borderBottom: 'none',
    },
    tableData: {
      borderBottom: 'none',
    },
    title: {
      textTransform: 'capitalize',
      fontWeight: 500,
      color: '#333',
      borderBottom: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    rowRoot: {
      '@media(max-width: 580px)': {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid #ddd',
      },
    },
  })
)
