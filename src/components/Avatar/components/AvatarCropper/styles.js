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
      position: 'relative',
      display: 'flex',
      height: '450px',
      flexDirection: 'column',
      padding: '20px',
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
    },
  })
)
