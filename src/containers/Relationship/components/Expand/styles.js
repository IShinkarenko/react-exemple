import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    expandBnt: {
      boxShadow: 'none',
      color: '#fff',
      height: 43,
      padding: '14px 40px',
      '@media(max-width: 650px)': {
        width: '100%',
        margin: '24px auto 0',
      },
    },
    expandBntTitle: {
      marginLeft: 7,
    },
    wrapper: {
      width: '100%',
      height: '100%',
      background: 'lightblue',
      padding: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: 5,
      willChange: 'width, height',
      zIndex: 1000,
      width: '15%',
      height: '45px',
    },
    item: {
      width: '100%',
      height: '100%',
      background: 'white',
      borderRadius: 5,
      willChange: 'transform, opacity',
    },
    expandBox: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    expandButton: {
      position: 'absolute',
      zIndex: 1001,
      width: '100%',
      color: '#fff',
      height: '100%',
    },
    expandContainer: {
      display: 'flex',
      flex: 1,
      position: 'absolute',
      background: '#fff',
      borderRadius: 5,
      border: '1px solid rgba(0, 0, 0, 0.12)',
      flexDirection: 'column',
      left: 15,
      right: 15,
      top: 15,
    },
    expandHeading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      // marginBottom: 24,
    },
    categories: {
      maxWidth: 650,
      margin: '0px',
    },
  })
)
