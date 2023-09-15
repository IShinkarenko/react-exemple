import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    outboundPaper: {
      width: 370,
      height: '100%',
      transition: 'width 0.3s ease',
      '@media(max-width: 650px)': {
        width: 200,
      },
    },
    sectionOrdering: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    },
    sectionOrderingTop: {
      display: 'flex',
      alignItems: 'center',
      padding: '50px 30px',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 11,
    },
    sectionOrderingBg: {
      background: 'linear-gradient(top,#56b1b4, #74D3D1)',
      position: 'absolute',
      height: 300,
      width: 400,
      top: '-47px',
      borderRadius: 66,
      transform: 'rotate(350deg)',
      zIndex: '-1',
    },
    sectionOrderinDndContainer: {
      padding: '15px 24px',
      position: 'relative',
      zIndex: 100,
      marginTop: '-37px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    sectionOrderingButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginTop: 24,
      '& button': {
        minWidth: '90px',
        textTransform: 'capitalize',
      },
    },
    sectionOrderingTitle: {
      textTransform: 'capitalize',
      fontSize: 25,
      fontWeight: 300,
      fontFamily: 'Montserrat, sans-serif',
      color: '#fff',
      textAlign: 'center',
    },
    sectionOrderingSubtitle: {
      textAlign: 'center',
      fontSize: 14,
      color: '#fff',
      fontFamily: 'Montserrat, sans-serif',
      marginTop: 14,
      marginBottom: 24,
      width: 240,
    },
    sectionBadge: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      display: 'block',
      padding: 0,
      marginLeft: 7,
    },
    orderItem: {
      display: 'flex',
      alignItems: 'center',
    },

    orderIndex: {
      width: 19,
      height: 19,
      // background: '#ddd',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      fontSize: 12,
      color: '#74D3D1',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      right: 7,
      border: '1px solid #74D3D1',
    },
  })
)
