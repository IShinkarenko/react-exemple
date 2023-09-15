import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    generalData: {
      borderRadius: 5,
      flex: 1,
      padding: '0 5vw',
      backgroundColor: '#fff',
      position: 'relative',
      border: '1px solid rgba(224, 224, 224, 0.6)',
      borderRadius: 5,
      overflow: 'hidden',
    },
    inner: {
      display: 'flex',
      position: 'relative',
      zIndex: 2,
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    generalDataTitle: {
      flex: 0.7,
      paddingTop: 40,
      paddingLeft: '3vw',
      paddingTop: '3vw',
      '@media(max-width: 767px)': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      },
    },
    generalDataMap: {
      flex: 1,
    },
    grid: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundSize: '15px 15px',
      backgroundImage:
        'linear-gradient(to right, #F9F9F9 1px, transparent 1px), linear-gradient(to bottom, #F9F9F9 1px, transparent 1px)',
      zIndex: 1,
      top: 0,
      left: 0,
    },
    heading: {
      marginBottom: 24,
      fontWeight: 600,
    },
    subTitle: {
      fontSize: 14,
      color: '#8f8e8e',
    },
    subTitleNumber: {
      fontSize: '3vw',
      fontWeight: 600,
      lineHeight: 1,
      '@media(max-width: 1100px)': {
        fontSize: 27,
      },
      '@media(max-width: 960px)': {
        fontSize: 36,
      },
    },
    tooltipText: {
      fontSize: 14,
    },
    companyInforaphics: {
      display: 'flex',
      margin: '24px -12px 0',
      '& > div': {
        margin: '0 12px',
      },
      '@media(max-width: 767px)': {
        flexDirection: 'column',
        '& > div': {
          margin: '24px 12px',
        },
      },
    },
  })
)
