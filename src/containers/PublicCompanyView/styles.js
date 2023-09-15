import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    companyLogoWrap: {
      marginRight: 24,
      flex: 0,
      '@media(max-width: 767px)': {
        margin: '0 auto 24px',
      },
    },
    companyTop: {
      display: 'flex',
      alignItems: 'center',
    },
    companyLogo: {
      width: 90,
      height: 90,
      border: '1px solid #f1f1f1',
    },
    companyBackground: {
      height: 350,
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#dadada',
      borderRadius: 3,
      '@media(max-width: 550px)': {
        height: 250,
      },
    },
    companyContainer: {
      width: '75%',
      margin: '-50px auto 0',
      '@media(max-width: 991px)': {
        width: '90%',
      },
    },
    companyInfoInner: {
      flex: 1,
      '@media(max-width: 767px)': {
        width: '100%',
      },
    },
    companyInfoBlock: {
      backgroundColor: '#fff',
      position: 'relative',
      zIndex: 1,
      padding: 24,
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 3,
      marginBottom: 14,
    },
    companyGeneralInfoContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    companySecondaryData: {
      display: 'flex',
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    companyInfoItem: {
      display: 'flex',
      marginTop: 9,
    },
    itemTitle: {
      fontSize: 14,
      width: 120,
      color: '#878585',
    },
    itemValue: {
      fontSize: 14,
      fontWeight: 500,
    },

    companyDescription: {
      color: '#8d8d8d',
      fontSize: 14,
      marginTop: 24,
    },
    companySpecialties: {
      marginTop: 24,
    },
    companySpecialtiesTitle: {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 5,
    },
    companySpecialtiesList: {
      fontSize: 14,
      color: '#8d8d8d',
    },
    tab: {
      fontSize: 15,
    },
    companySections: {
      padding: '24px 0',
    },

    sectionItems: {
      '& > div': {
        marginBottom: 17,
      },
    },
    info: {
      '& > *:first-child': {
        width: 150,
      },
    },
    icon: {
      marginLeft: 7,
    },
    contacts: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > div': {
        flex: '0 0 250px',
        padding: '9px',
      },
    },
    button: {
      color: '#fff',
      textTransform: 'capitalize',
      '@media(max-width: 767px)': {
        margin: '24px 0',
      },
    },
    itemActions: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 30,
      marginLeft: '-5px',
      '@media(max-width: 767px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
      },
      '& > span': {
        display: 'flex',
        alignItems: 'center',
        marginRight: '10px',
        cursor: 'pointer',
        fontWeight: 500,
        position: 'relative',
        transition: 'all 0.2s ease',
        padding: '0 2px',
        '@media(max-width: 767px)': {
          flex: 1,
          margin: '8px 0',
        },
        '&:hover': {
          color: '#2d7d80',
        },
      },
      '& svg': {
        fontSize: 17,
        marginRight: 5,
      },
    },
    empty: {
      color: '#c8c8c8',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
  })
)
