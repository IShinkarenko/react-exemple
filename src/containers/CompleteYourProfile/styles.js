import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    completeProfileContainer: {
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 50px 64px ',
      justifyContent: 'flex-start',
      borderRadius: 3,
      maxWidth: 1070,
      margin: '0 auto',
      backgroundColor: '#fff',
      border: '1px solid #e5e5e5',
      heigth: '100%',
      '@media(max-width: 767px)': {
        padding: '24px 24px 64px ',
      },
    },
    accordionSummary: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    profileContainer: {
      marginTop: 30,
      marginBottom: 30,
      '& > div': {
        padding: '7px 0',
      },
    },
    expandIcon: {
      fontSize: 14,
      opacity: 0.4,
      '&.Mui-expanded': {
        transform: 'rotate(90deg)',
      },
    },
    label: {
      userSelect: 'none',
      fontSize: '12px',
      '& a': {
        color: '#396dd0',
        margin: '0 3px',
      },
    },
    agreeText: {
      fontSize: '14px',
      '& span': {
        marginLeft: '3px',
        fontSize: '14px',
        color: '#396dd0',
      },
    },
  })
)
