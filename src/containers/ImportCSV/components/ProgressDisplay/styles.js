import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_ProgressDisplay: {
      padding: '2em',
      flex: 1,
    },
    CSVImporter_ProgressDisplay__status: {
      fontSize: '1.15em',
      color: '#202020',
    },
    CSVImporter_ProgressDisplay__status_pending: {
      color: '#808080',
    },
    CSVImporter_ProgressDisplay__count: {
      textAlign: 'right',
      fontSize: '1em',
      color: '#808080',
      '& > var': {
        display: 'inline-block',
        width: 1,
        height: 1,
        overflow: 'hidden',
        opacity: 0,
      },
    },
    CSVImporter_ProgressDisplay__progressBar: {
      position: 'relative',
      width: '100%',
      background: '#f0f0f0',
      height: '1.4em',
      background: 'transparent',
      position: 'relative',
    },
    CSVImporter_ProgressDisplay__progressBarIndicator: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 0,
      height: '100%',
      transition: 'width 0.2s ease-out',
      borderRadius: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#74d3d1',
    },
  })
)
