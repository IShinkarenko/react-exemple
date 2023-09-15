import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    avatar: ({ width, height }) => ({
      width: width,
      height: height,
      position: 'relative',
      backgroundColor: '#b1b1b1',
      fontSize: '13px',
      border: '1px solid #f6f6f6',
      '& > img': {
        objectFit: 'contain',
        backgroundColor: '#bdbdbd',
      },
      '&:hover > div': { opacity: 1 },
      cursor: 'pointer',
      '@media(max-width: 767px)': {
        margin: '0 auto',
      },
    }),
    avatarContainer: ({ width, height }) => ({
      width: width,
      height: height,
      position: 'relative',
      '&:hover > div:last-child': { opacity: 1 },
    }),
    isEdit: { cursor: 'pointer' },
    border: {
      border: `2px solid #b1b1b1`,
    },
    dropzoneWrapper: {
      padding: '20px',
    },
    iconContainer: ({ width, height }) => ({
      position: 'absolute',
      width: width,
      height: height,
      borderRadius: '50%',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      opacity: 0,
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.1s ease-in-out',
      backgroundColor: 'rgba(195, 193, 193, .7)',
      cursor: 'pointer',
      zIndex: 2,
    }),

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
  })
)
