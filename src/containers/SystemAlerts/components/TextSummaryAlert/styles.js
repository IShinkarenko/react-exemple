import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    summaryContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
    },
    summaryButtons: {
      marginTop: 24,
      display: 'flex',
      justifyContent: 'space-between',
    },
    summaryButton: {
      minWidth: 'unset',
      textTransform: 'capitalize',
      boxShadow: 'unset',
      fontSize: 14,
      padding: '3px 14px',
    },
    summaryButtonApply: {
      color: '#fff',
    },
    editField: {
      width: '100%',
    },
    displayField: {
      border: '1px dashed #ddd',
      padding: '7px 14px',
      borderRadius: 3,
    },
  })
)
