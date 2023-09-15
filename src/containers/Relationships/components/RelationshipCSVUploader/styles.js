import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    csvContainer: {
      height: '100%',
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
    },
    csvContainerHead: {
      display: 'flex',
      position: 'relative',
      marginBottom: 14,
      alignItems: 'center',
      '& svg': {
        marginLeft: 14,
      },
    },
    closeCSVImportInfo: {
      display: 'flex',
      alignItems: 'center',
    },
    closeCSVImport: {
      position: 'absolute',
      top: '50%',
      right: 0,
      transform: 'translate(0, -50%)',
    },
    csvImporter: {
      display: 'flex',
      flex: 1,
      alignItems: 'flex-start',
    },
    downloadSampleCSV: {
      display: 'flex',
      alignItems: 'center',
      padding: '3px 7px',
      color: '#fff',
      border: '1px solid #74d3d1',
    },
  })
)
