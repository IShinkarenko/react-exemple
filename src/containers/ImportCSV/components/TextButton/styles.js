import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_TextButton: {
      transition: 'all 0.2s ease',
      '&:hover:not(:disabled)': {
        background: 'darken(#f0f0f0, 10%)',
      },
      '&:disabled': {
        opacity: 0.25,
        cursor: 'default',
      },
    },
  })
)
