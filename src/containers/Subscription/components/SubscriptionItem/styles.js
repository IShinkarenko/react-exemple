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
    subscriptionItem: {
      width: 400,
      paddingBottom: '30px',
      backgroundColor: '#fff',
      marginRight: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow:
        '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    },
    subscriptionLogo: {
      borderRadius: '50%',
      backgroundColor: '#fff',
      width: 90,
      height: 90,
      marginTop: '-45px',
      marginBottom: '24px',
      padding: 10,
      borderTop: '1px solid #F4f4f4',
      '& > img': {
        maxWidth: '100%',
      },
    },
    subscriptionSubtitle: {
      fontSize: 17,
      marginBottom: 24,
      color: '#7E7C8A',
    },
    subscriptionDescriptionTitle: {
      fontSize: 12,
      fontWeight: 900,
      marginBottom: 24,
      color: '#7E7C8A',
    },
    subscriptionTitle: {
      fontSize: 27,
      marginBottom: 24,
      fontWeight: 700,
    },
    subscriptionDescription: {
      paddingTop: 20,
      paddingBottom: 0,
      paddingLeft: 10,
      paddingRight: 10,
      borderBottom: '1px solid #F4f4f4',
    },
    subscriptionPrice: {
      color: '#323a45',
      fontSize: 50,
      fontWeight: 900,
      letterSpacing: '-1px',
      lineHeight: 1,
      marginBottom: 0,
      '& > sup': {
        position: 'relative',
        lineHeight: 0,
        verticalAlign: 'baseline',
        fontSize: 24,
        fontWeight: 500,
        top: '-25px',
      },
      '& > sub': {
        position: 'relative',
        lineHeight: 0,
        verticalAlign: 'baseline',
        fontSize: 18,
        fontWeight: 400,
        marginLeft: '-5px',
      },
    },
    subscriptionName: {
      fontWeight: 700,
      marginBottom: 24,
    },
    subscriptionDetails: {
      listStyleType: 'none',
      padding: 0,
      margin: '24px 0',
      textAlign: 'center',
      '& > li': {
        padding: '10px 0',
        color: '#7E7C8A',
        fontSize: 16,
        fontWeight: 300,
      },
    },
    subscriptionButton: {
      color: '#fff',
      padding: '12px 35px',
      marginTop: 14,
      boxShadow: 'none',
    },
    subscriptionButtonBasic: {
      color: '#74d3d1',
    },
    subscriptionHead: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      paddingBottom: 24,
    },
    subscriptionUnlimited: {
      backgroundColor: '#74d3d1',
      color: '#fff',
    },
    subscriptionPriceUnlimited: {
      color: '#fff',
    },
    top: {
      backgroundColor: '#fff',
      padding: '24px',
      textAlign: 'center',
    },
    bottom: {
      backgroundColor: '#fff',
      padding: '24px',
      textAlign: 'center',
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
  })
)
