import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
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

    companyContainer: {
      width: '65vw',
      maxWidth: 1070,
      margin: '-50px auto 0',
      '@media(max-width: 960px)': {
        width: '80vw',
      },
      '@media(max-width: 550px)': {
        width: '90vw',
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
    companyGeneralTop: {
      display: 'flex',
      alignItems: 'center',
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
    companyTags: {
      marginBottom: 7,
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
      padding: '0',
      marginTop: 50,
      position: 'relative',
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
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
    scrollButton: {
      fontSize: 20,
    },
    profileSectionsTabs: {
      borderBottom: '1px solid #ddd',
      padding: '36px 0 0',
    },
    addNewSectionButton: {
      top: '-35px',
      right: '50%',
      width: 70,
      height: 70,
      position: 'absolute',
      transform: 'translate(50%, 0)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f9f9fc',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: 70,
        height: 70,
        border: '1px solid #ddd',
        borderRadius: '50%',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        transform: 'rotate(135deg)',
        bottom: 1,
      },
      '&:hover': {
        '& $addNewSectionButtonInner': {
          borderColor: '#fff',
        },
        '& $addNewSectionButtonInner::after': {
          borderColor: '#74d3d1',
        },
      },
    },
    addNewSectionButtonInner: {
      width: 57,
      height: 57,
      background: theme.palette.primary.main,
      borderRadius: '50%',
      color: '#fff',
      cursor: 'pointer',
      zIndex: 2,
      top: '-2px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 0 4px transparent',
      border: '1px solid transparent',
      transition: 'all 0.5s ease',
      '&::after': {
        content: '""',
        position: 'absolute',
        width: 63,
        height: 63,
        border: '2px solid transparent',
        borderRadius: '50%',
        transition: 'all 0.3s ease',
      },
    },
  })
)
