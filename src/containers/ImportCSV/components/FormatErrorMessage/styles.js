import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_FormatErrorMessage: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5em 1em',
      borderRadius: '0.4em',
      background: '#f0f0f0',
      color: '#c00000',
      '& > span': {
        flex: '1 1 0',
        marginRight: '1em',
        width: 0,
        wordBreak: 'break-word',
      },
    },
  })
)
