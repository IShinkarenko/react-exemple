import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    companyItem: {
      fontSize: '13px',
      padding: '9px 15px 9px 36px',
      position: 'relative',
      cursor: 'pointer',
      '& svg': {
        fontSize: '16px',
        marginRight: '5px',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    activeCompany: {
      position: 'absolute',
      left: 15,
    },
    small: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
      fontSize: 12,
      marginRight: 7,
      border: '1px solid #f1eeee',
    },
    logoWrap: {
      display: 'flex',
      alignItems: 'center',
    },
    pendingStatus: {
      display: 'inline-block',
      background: 'rgb(255, 191, 0)',
      padding: '3px 7px',
      fontSize: 10,
      borderRadius: 7,
      marginLeft: 7,
      color: '#4f4f4f',
    },
    companyItemDisabled: {
      opacity: 0.55,
      pointerEvents: 'none',
    },
    companyItemSkeleton: {
      display: 'flex',
      alignItems: 'center',
      padding: '9px 15px 9px 36px',
    },
    companyItemSkeletonLogo: {
      flex: '0 0 26px',
      marginRight: 7,
      background: '#fff',
    },
  })
)
