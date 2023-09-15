import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    tooltip: {
      fontSize: '15px',
      position: 'relative',
    },
    launchIcon: {
      position: 'absolute',
    },
    dashed: {
      borderBottom: '1px dashed #ddd',
      paddingBottom: 4,
    },
    chip: {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0 12px',
      height: 32,
      borderRadius: 16,
      backgroundColor: '#e0e0e0',
      fontSize: '0.8125rem',
      marginRight: 7,
    },
  })
)
