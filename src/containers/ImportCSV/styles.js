import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_Importer: {
      lineHeight: 1.4,
      flex: 1,
      display: 'flex',
      width: 500,
      '& *': {
        boxSizing: 'border-box',
      },
    },
  })
)
