import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_FormatPreview__mainResultBlock: {
      flex: 1,
    },
    CSVImporter_FormatPreview__header: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '0.5em',
      fontSize: '1.15em',
      color: '#808080',
    },
    CSVImporter_FormatPreview__headerToggle: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '-0.5em',
      marginBottom: '-0.5em',
      marginLeft: '1.5em',
      color: '#202020',
      cursor: 'pointer',
      '& > input[type="checkbox"]': {
        marginRight: '0.5em',
        width: '1.2em',
        height: '1.2em',
        cursor: 'pointer',
      },
    },
    CSVImporter_FormatPreview__mainPendingBlock: {
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
      padding: '2em',
      color: '#808080',
    },
  })
)
