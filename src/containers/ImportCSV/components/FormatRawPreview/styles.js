import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_FormatRawPreview: {},
    CSVImporter_FormatRawPreview__scroll: {
      marginBottom: '1.2em',
      overflow: 'auto',
      borderRadius: '5pxd',
      background: '#404040',
      color: '#f0f0f0',
    },
    CSVImporter_FormatRawPreview__pre: {
      width: '100%',
      margin: 0,
      padding: '0.5em 1em',
      lineHeight: 1.25,
      fontSize: '14px',
      '& > aside': {
        display: 'inline-block',
        marginLeft: '0.2em',
        padding: '0 0.25em',
        borderRadius: '0.4em * 0.5',
        background: '#fff',
        fontSize: '0.75em',
        color: '#808080',
        opacity: 0.75,
      },
    },
  })
)
