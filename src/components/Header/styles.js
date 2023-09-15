import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    myToolbar: {
      fontSize: 20,
      display: 'flex',
      justifyContent: 'space-between',
    },
    header: {
      backgroundColor: theme.palette.background.default,
      borderBottom: '1px solid #d6d4d4',
      boxShadow: 'unset',
    },
    headerRight: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    searchTextGlobalField: {
      padding: 0,
      marginRight: 21,
      '& > div > div': {
        backgroundColor: 'rgb(243, 246, 249)',
        fontSize: '0.9375rem',
        border: '1px solid rgb(229, 232, 236)',
        borderRadius: 10,
        height: 35,
        '&:hover fieldset': {
          borderColor: 'transparent !important',
        },
        '&:hover': {
          backgroundColor: 'rgb(229, 232, 236)',
        },
      },
      '& fieldset': {
        borderColor: 'transparent',
      },
    },
    headerButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > *': {
        marginLeft: 7,
      },
    },
    upgradeMsg: {
      display: 'flex',
      alignItems: 'center',
      marginRight: 30,
    },
    upgradeMsgLink: {
      color: '#2d7d80',
      textDecoration: 'underline rgba(25, 125, 128, 0.4)',
      marginLeft: 3,
      cursor: 'pointer',
    },
    subscriptionBadge: {
      backgroundColor: '#74d3d1',
      width: 14,
      height: 14,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
)
