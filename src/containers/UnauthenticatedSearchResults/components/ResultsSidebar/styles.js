import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    filtersArea: {
      overflow: 'scroll',
      padding: '7px 15px',
      background: '#74d3d11f',
      borderRadius: 7,
      '& > div': {
        margin: '0 0 14px',
        '& > div > div > div': {
          backgroundColor: '#fff',
        },
      },
    },
    sidebarInner: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    matches: {
      position: 'relative',
      background: '#74d3d11f',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 7,
      padding: '10px 15px 15px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 30,
      boxShadow:
        '0px 2px 1px -12px rgb(0 0 0 / 7%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      '& p': {
        color: '#6b6b6b',
        fontSize: 13,
        textAlign: 'center',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: 0,
        marginBottom: 10,
        '& strong': {
          color: '#333',
        },
      },
    },
    image: {
      marginBottom: 15,
    },
    link: {
      display: 'block',
      padding: 9,
      background: '#74d3d1',
      color: '#fff',
      fontSize: 13,
      borderRadius: 7,
      fontFamily: 'Montserrat, sans-serif',
      letterSpacing: 0,
      border: '1px solid',
      borderColor: 'transparent',
      transition: 'all 0.25s ease',
      cursor: 'pointer',
      '&:hover': {
        borderColor: '#74d3d1',
        background: 'transparent',
        color: '#74d3d1',
      },
    },
    searchAgain: {
      width: '100%',
      marginTop: 15,
      padding: 10,
      fontFamily: 'Montserrat, sans-serif',
      letterSpacing: 0,
      textTransform: 'capitalize',
      background: '#74d3d1',
      color: '#fff',
      fontSize: 13,
      borderRadius: 7,
      transition: 'all 0.25s ease',
      boxShadow: 'none',
      border: '1px solid',
      borderColor: 'transparent',
      '&:hover': {
        boxShadow: 'none',
        borderColor: '#74d3d1',
        background: 'transparent',
        color: '#74d3d1',
      },
    },
    infoBox: {
      background: '#74d3d11f',
      padding: 24,
      borderRadius: 7,
      display: 'flex',
      transition: 'all 0.3s ease',
      '& svg': {
        marginRight: 15,
        color: '#74d3d1',
      },
      '& p': {
        color: '#7e7e7e',
        fontSize: 13,
      },
    },
    infoBoxReverse: {
      top: '120%',
      bottom: 'unset',
    },
    searchTextAgainInput: {
      '& > div > div': {
        backgroundColor: '#fff',
        height: 46,
        borderRadius: 15,
      },
    },
    searchSwitcher: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      marginBottom: 24,
      borderRadius: 5,
      backgroundColor: '#fff',
      border: '1px solid #eeee',
      marginTop: 30,
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
    sideBarSearchContainer: {
      position: 'relative',
      height: '100%',
    },
    sidebarSearchText: {
      '&.$enter': {
        transform: 'translateX(110%)',
      },
      '&.$enter-active': {
        transform: 'translateX(0%)',
        transition: 'all 0.3s ease',
      },
      '&.$exit-active': {
        transform: 'translateX(110%)',
        transition: 'all 0.3s ease',
      },
    },
    sidebarWizardSearch: {
      '&.$exit': {
        position: 'absolute',
      },
      '&.$exit-active': {
        transform: 'translateX(-110%)',
        transition: 'all 0.3s ease',
      },
      '&.$enter': {
        position: 'absolute',
        transform: 'translateX(-110%)',
        width: '100%',
      },
      '&.$enter-active': {
        transform: 'translateX(0%)',
        transition: 'all 0.3s ease',
        width: '100%',
      },
    },
  })
)
