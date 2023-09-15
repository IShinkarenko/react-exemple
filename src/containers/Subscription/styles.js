import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    subscription: {
      margin: '-16px',
    },
    subscriptions: {
      display: 'flex',
      marginTop: 100,
      paddingBottom: 55,
      justifyContent: 'center',
    },
    subscriptionTitle: {
      fontSize: 27,
      marginBottom: 24,
      fontWeight: 700,
    },
    subscriptionSubtitle: {
      fontSize: 17,
      marginBottom: 24,
      color: '#7E7C8A',
    },
    top: {
      backgroundColor: '#fff',
      padding: '32px',
      textAlign: 'center',
      borderRadius: 5,
    },
    faqContainer: {
      borderRadius: 5,
      backgroundColor: '#fff',
      padding: '24px',
      textAlign: 'center',
    },
    faqInner: {
      maxWidth: 1070,
      margin: '0 auto',
    },
    questions: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: 14,
    },
    question: {
      flex: 1,
      padding: '10px 50px',
      alignItems: 'flex-start',
      flexDirection: 'column',
      textAlign: 'left',
      '& > h6': {
        marginBottom: '15px',
      },
      '& > p': {
        color: '#7E7C8A',
      },
    },
    bannerInfo: {
      padding: 24,
      textAlign: 'center',
    },
    customerPortalButton: {
      color: '#fff',
      textTransform: 'capitalize',
      boxShadow: 'unset',
      marginTop: 14,
    },
    backIcon: {
      position: 'fixed',
      top: 80,
      left: 13,
    },
  })
)
