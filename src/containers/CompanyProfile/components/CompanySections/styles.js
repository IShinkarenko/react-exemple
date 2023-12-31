import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    companyInfoBlock: {
      backgroundColor: '#fff',
      position: 'relative',
      zIndex: 1,
      padding: 24,
      border: '1px solid rgba(0, 0, 0, 0.12)',
      borderRadius: 3,
      marginBottom: 14,
    },
    tab: {
      fontSize: 15,
      pasition: 'relative',
    },
    selectedTab: {
      '&::after': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderLeft: '11px solid transparent',
        borderRight: '11px solid transparent',
        top: 0,
        borderTop: '11px solid #f9f9fc',
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        width: 0,
        height: 0,
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
        borderTop: '14px solid #74D3D1',
      },
    },
    companySections: {
      padding: '0',
      marginTop: 50,
      position: 'relative',
    },

    profileSectionsTabs: {
      borderBottom: '1px solid #ddd',
      padding: '36px 0 0',
      alignItems: 'center',
      '@media(max-width: 767px)': {
        padding: '57px 0 0',
      },
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
      zIndex: 10,
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
    scrollBtn: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      backgroundColor: 'transparent',
      margin: '0 3px',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    emptyItemsIcon: {
      bottom: 55,
      right: '50%',
      width: 29,
      position: 'absolute',
      transform: 'translate(50%, 0)',
    },
    emptyItemsFallback: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      position: 'relative',
      paddingTop: 100,
    },
  })
)
