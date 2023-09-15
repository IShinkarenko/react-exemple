import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    generalInfoContainer: {
      display: 'flex',
      justifyContent: 'center',
      maxWidth: '820px',
      margin: '0 auto',
      paddingTop: '30px',
      alignItems: 'center',
      height: 'calc(100% - 50px)',
      flex: 1,
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    logoBlock: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      borderRadius: '4px',
      backgroundColor: '#f9f9fc',
      padding: theme.spacing(5.6, 6.4, 7.6),
      position: 'relative',
      [theme.breakpoints.down('xl')]: {
        marginTop: theme.spacing(4),
        marginRight: 0,
        maxWidth: '100%',
        width: '100%',
      },
    },
    companyInfoBlock: {
      flex: 1,
      padding: theme.spacing(4, 6.4, 0),
      display: 'flex',
      flexDirection: 'column',
      [theme.breakpoints.down('xl')]: {
        maxWidth: '100%',
        width: '100%',
      },
      '@media(max-width: 650px)': {
        padding: '32px 0 0',
      },
    },
    descriptionText: {
      '& > p': {
        margin: '0 auto',
        [theme.breakpoints.down('xl')]: {
          maxWidth: '230px',
        },
      },
    },
    uploadLogo: {
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(4.8),
      '& > div:focus': {
        outline: 'none',
      },
      '& > div': {
        justifyContent: 'center',
      },
      '@media(max-width: 650px)': {
        '& > div > div': {
          flex: 1,
          maxWidth: 'unset',
        },
      },
    },
    preview: {
      width: '160px',
      height: '160px',
      borderRadius: '50%',
      backgroundColor: '#EFEFEF',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: '1px solid transparent',
      position: 'relative',
      '&.previewError': {
        borderColor: theme.palette.error.main,
      },
    },
    damagedFileWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#dc0020',
      backgroundColor: '#fff',
      borderRadius: '50%',
      textAlign: 'center',
    },
    previewImg: {
      width: '160px',
      height: '160px',
      borderRadius: '50%',
      objectFit: 'contain',
    },
    errorUpload: {
      fontSize: '12px',
      color: theme.palette.error.main,
      marginTop: theme.spacing(1.6),
      textAlign: 'center',
      position: 'absolute',
      bottom: '8px',
      left: '10px',
      right: '10px',
    },
    deleteIconWrapper: {
      position: 'absolute',
      height: '160px',
      width: '160px',
      top: 0,
      left: 0,
      zIndex: 9,
      display: 'flex',
      opacity: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: '50%',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        opacity: 1,
      },
    },
    organizationName: {
      marginTop: theme.spacing(6.4),
      minHeight: '75px',
    },
    organizationDescription: {
      marginTop: theme.spacing(6.4),
    },
  })
)
