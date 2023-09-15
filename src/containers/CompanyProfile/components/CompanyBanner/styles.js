import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    companyBackground: {
      height: 350,
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#dadada',
      borderRadius: 3,
      '@media(max-width: 550px)': {
        height: 250,
      },
    },
    editIcon: {
      position: 'absolute',
      top: 24,
      right: 24,
      backgroundColor: '#fff',
      padding: 9,
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      '& svg': {
        fontSize: 17,
      },
      '&:hover': {
        backgroundColor: '#f5f3f3',
      },
    },
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
  })
)
