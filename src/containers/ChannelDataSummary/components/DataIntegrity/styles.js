import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    dataIntegrity: {
      borderRadius: 5,
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 24,
      paddingBottom: 24,
      border: '1px solid rgba(224, 224, 224, 0.6)',
      borderRadius: 5,
      '@media(max-width: 1100px)': {
        paddingBottom: '0',
      },
    },
    progressLine: {
      position: 'relative',
      height: 7,
      borderRadius: 2,
      backgroundColor: '#ddd',
      width: '100%',
      overflow: 'hidden',
    },
    innerLine: {
      position: 'absolute',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: '#74d3d1',
    },
    dataIntegrityTitle: {
      marginBottom: 24,
      fontWeight: 600,
      padding: '24px 0 0',
      textAlign: 'center',
    },
    table: {
      tableLayout: 'fixed',
      width: 700,
      margin: '0 auto',
      border: '1px solid rgba(224, 224, 224, 1)',
      '@media(max-width: 1100px)': {
        width: '100%',
      },
    },
  })
)
