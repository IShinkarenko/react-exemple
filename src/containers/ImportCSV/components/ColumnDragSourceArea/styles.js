import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragSourceArea: {
      display: 'flex',
      marginTop: '0.5em',
      marginBottom: '1em',
    },
    CSVImporter_ColumnDragSourceArea__box: {
      position: 'relative',
      flex: '1 1 0',
      marginRight: '0.5em',
      width: 0,
      border: '1px solid #eaeaea',
      borderRadius: 5,
    },
    CSVImporter_ColumnDragSourceArea__boxAction: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
    CSVImporter_ColumnDragSourceArea__pageFiller: {
      flex: '1 1 0',
      marginRight: '0.5em',
    },
    CSVImporter_ColumnDragSourceArea__control: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    CSVImporter_ColumnDragSourceArea__page: {
      position: 'relative',
      flex: '1 1 0',
      display: 'flex',
      paddingTop: '0.5em',
      paddingLeft: '0.5em',
    },
    CSVImporter_ColumnDragSourceArea__pageIndicator: {
      position: 'absolute',
      top: '-1em',
      right: 0,
      left: 0,
      textAlign: 'center',
      fontSize: '0.75em',
    },
  })
)
