import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    header: {
      display: 'block',
      height: '100%',
    },
    lngButton: {
      position: 'absolute',
      top: 15,
      right: 10,
      color: '#fff',
      zIndex: 2,
      '& svg': {
        color: '#fff',
      },
    },
    inner: {
      height: '100%',
      display: 'block',
    },
    form: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 2,
      position: 'relative',
      margin: '-200px auto 0',
      paddingBottom: 30,
      position: 'relative',
      width: 500,
      paddingTop: 60,
      transition: 'all 0.2s ease',
      '@media(max-width: 650px)': {
        width: '95%',
      },
    },
    formTraditional: {
      height: 'auto',
      paddingBottom: 100,
      paddingTop: 0,
      '@media(max-width: 767px)': {
        width: '90%',
      },
    },
    bg: {
      flex: 0.5,
      height: '48vh',
      width: '100%',
      position: 'relative',
      transition: 'height 0.2s ease',
      zIndex: 1,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        zIndex: 1,
      },
    },
    traditionalBg: {
      height: '59vh',
    },
    images: {
      height: '100%',
    },
    searchSwitcher: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 24,
      borderRadius: 5,
      backgroundColor: '#fff',
      position: 'absolute',
      transform: 'translate(50%, -60px)',
      width: '100%',
      right: '50%',
      transition: 'all 0.2s ease',
      willChange: 'transform',
    },
    traditionalSearchSwitcher: {
      transform: 'translate(50%, 100px)',
      margin: 0,
    },
    searchTypeBtn: {
      flex: 1,
      boxShadow: 'unset',
      transition: 'all 0.2s ease',
      backgroundColor: 'transparent',
    },
    searchTypeBtnActive: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    traditionalSearchContainer: {
      backgroundColor: '#fff',
    },
    traditionalField: {
      '& > div > div': {
        backgroundColor: '#fff',
        height: 56,
        borderRadius: 30,
      },
    },
    traditional: {
      willChange: 'transform',

      '&.$enter': {
        transform: 'translateY(-110%)',
      },
      '&.$enter-active': {
        transform: 'translateY(0%)',
        transition: 'all 0.3s ease',
      },
      '&.$exit-active': {
        opacity: 0,
        transform: 'translateY(-110%)',
        transition: 'all 0.2s ease',
      },
    },
    wizzard: {
      '&.$exit': {
        position: 'absolute',
        top: 60,
      },
      '&.$exit-active': {
        transform: 'translateY(110%)',
        opacity: 0,
        transition: 'all 0.3s ease',
      },
      '&.$enter': {
        position: 'absolute',
        transform: 'translateY(110%)',
      },
      '&.$enter-active': {
        transform: 'translateY(0)',
        opacity: 1,
        transition: 'all 0.3s ease',
      },
    },
    traditionalText: {
      '& > div >div': {
        '@media(max-width: 650px)': {
          height: 'auto',
        },
      },
      '& span': {
        '@media(max-width: 1050px)': {
          fontSize: 30,
        },
        '@media(max-width: 767px)': {
          fontSize: 24,
        },
        '@media(max-width: 650px)': {
          fontSize: 19,
        },
      },
    },
  })
)
