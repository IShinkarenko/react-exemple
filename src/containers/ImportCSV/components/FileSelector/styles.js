import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_FileSelector: {
      textAlign: 'center',
      color: '#202020',
      alignItems: 'center',
      borderStyle: 'dashed',
      borderWidth: 2,
      borderRadius: 20,
      borderColor: 'rgb(215 215 215)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 20,
      cursor: 'pointer',
      height: 250,
      width: '100%',
      background: '#f5f5f77d',
      margin: 'auto',
      maxWidth: 1000,
      '&[data-active="true"]': {
        background: 'darken(#f0f0f0, 10%)',
        transition: 'background 0.1s ease-out',
      },
    },
  })
)
