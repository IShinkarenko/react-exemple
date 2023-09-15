import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragObject: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'none',
      pointerEvents: 'none',
    },
    CSVImporter_ColumnDragObject__positioner: {
      position: 'absolute',
      top: 0,
      left: 0,
      minWidth: '8em',
      width: 0,
      height: 0,
    },
    CSVImporter_ColumnDragObject__holder: {
      position: 'absolute',
      bottom: '-0.75em',
      left: '-50%',
      width: '100%',
      opacity: 0.9,
    },
  })
)
