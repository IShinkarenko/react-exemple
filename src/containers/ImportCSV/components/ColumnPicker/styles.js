import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    infoBox: {
      background: '#74d3d11f',
      padding: 24,
      borderRadius: 7,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.3s ease',
      '& svg': {
        marginRight: 15,
        color: '#74d3d1',
      },
      '& p': {
        color: '#333',
        fontSize: 13,
      },
      '@media(max-width: 767px)': {
        marginRight: 0,
        marginBottom: 14,
      },
    },
  })
)
