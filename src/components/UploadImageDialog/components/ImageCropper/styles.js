import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    isEdit: { cursor: 'pointer' },
    border: {
      border: `2px solid #b1b1b1`,
    },
    dropzoneWrapper: {
      padding: '20px',
    },
    cropWrapper: {
      width: '100%',
      height: 300,
      display: 'flex',
      padding: 20,
      position: 'relative',
      flexDirection: 'column',
      overflow: 'hidden',
    },
    dropzone: {
      height: '200px',
      border: '3px dashed rgb(116,211,209)',
      borderRadius: '20px',
      padding: '0 20px 0 20px',
      display: 'flex',
      alignItems: 'center',
    },
    closeButton: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    deleteButton: {
      textTransform: 'capitalize',
      '@media(max-width: 650px)': {
        marginBottom: 14,
      },
    },
    slidersWrapper: {
      padding: '15px',
      display: 'flex',
      alignItems: 'center',
      background: '#ede9e9',
      '& > div': {
        margin: '0',
        flex: 1,
        padding: '0 15px',
        '@media(max-width: 650px)': {
          width: '100%',
        },
      },
      '@media(max-width: 650px)': {
        flexDirection: 'column',
      },
    },
    uploadButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '15px',
      '@media(max-width: 650px)': {
        flexDirection: 'column',
      },
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: '-12px',
      marginLeft: '-12px',
    },
  })
)
