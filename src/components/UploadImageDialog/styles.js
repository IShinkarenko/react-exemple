import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    dropzone: {
      height: '200px',
      border: '3px dashed rgb(116,211,209)',
      borderRadius: '20px',
      padding: '0 20px 0 20px',
      display: 'flex',
      alignItems: 'center',
    },
    dropzoneWrapper: {
      padding: '20px',
    },
    uploadDialog: {
      padding: 0,
    },
  })
)
