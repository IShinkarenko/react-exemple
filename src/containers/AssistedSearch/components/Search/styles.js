import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    assistedWrapper: {
      padding: 24,
      height: '100%',
      overflow: 'hidden',
    },
    assistedContainer: {
      flex: 1,
      width: '500px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      margin: '0 auto',
      transition: 'all 0.2s ease',
      position: 'relative',
      paddingTop: 15,
    },
    assistedForm: {
      paddingBottom: 44,
      marginTop: 55,
      '& > div:first-child': {
        maxWidth: '650px',
      },
      '& > div': {
        maxWidth: '400px',
      },
      '@media(max-width: 600px)': {
        width: '95%',
        padding: '5px 20px 20px 20px',
      },
      '&.$exit': {
        position: 'absolute',
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
        position: 'relative ',
        transform: 'translateY(0)',
        opacity: 1,
        transition: 'all 0.3s ease',
      },
    },
    traditionalField: {
      '& > div > div': {
        height: 56,
        borderRadius: 15,
        backgroundColor: '#fff',
        maxWidth: 500,
        width: 400,
      },
    },
    assistedTraditionalSeacrh: {
      marginTop: 24,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 41,
      background: '#74d3d11f',
      padding: '3vw 4vw',
      borderRadius: 10,
      border: '1px solid #eee',
    },
    assistedHead: {
      fontSize: 35,
      textAlign: 'center',
      fontWeight: 700,
      marginBottom: 20,
    },
    assistedTraditionalHead: {
      fontSize: 27,
      fontWeight: 500,
      marginBottom: 14,
    },
    assistedWizzardHead: {
      fontSize: 27,
      fontWeight: 500,
      marginBottom: 32,
      textAlign: 'center',
    },
    assistedWizzardSeacrh: {
      background: '#74d3d159',
      padding: '3vw 4vw',
      borderRadius: 10,
      border: '1px solid #eee',
    },

    searchSwitcher: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 24,
      borderRadius: 5,
      backgroundColor: '#fff',
      position: 'absolute',
      width: '100%',
      top: 0,
      transform: 'translate(50%, 0)',
      right: '50%',
      transition: 'all 0.2s ease',
      willChange: 'transform',
      border: '1px solid #eee',
      borderRadius: 5,
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
        margin: '0 auto',
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
