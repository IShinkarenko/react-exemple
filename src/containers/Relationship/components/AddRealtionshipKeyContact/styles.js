import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    metaSpan: {
      width: '100%',
      padding: 15,
      backgroundColor: '#f6f6f6',
      fontSize: 13,
      margin: 0,
    },
    fieldSpan: {
      width: '100%',
      padding: '3px',
      margin: 0,
    },
    fieldGroup: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > div': {
        flex: '0 0 50%',
        padding: '3px',
        margin: 0,
      },
    },
    fieldGroupColumn: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      '& > div': {
        flex: 1,
        width: '100%',
        padding: '3px',
        margin: 0,
      },
    },
    metaName: {
      fontWeight: 600,
      color: theme.palette.secondary.main,
    },
  })
)
