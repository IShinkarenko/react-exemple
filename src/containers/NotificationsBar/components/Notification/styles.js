import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { typeColor } from 'containers/NotificationsBar/constants'

export default makeStyles(() =>
  createStyles({
    badgeWrapper: {
      display: 'block',
      margin: '25px 0 0',
    },
    notification: {
      position: 'relative',
      overflow: 'initial',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: 'rgba(0, 0, 0, 0.3)',
      },
    },
    title: {
      fontSize: '15px',
      textTransform: 'capitalize',
      maxWidth: '225px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    action: {
      fontSize: '10px',
      marginTop: 0,
      marginRight: 0,
      alignSelf: 'unset',
      position: 'relative',
    },
    root: {
      padding: '10px 16px 0 16px',
      alignItems: 'baseline',
    },
    messageContent: {
      padding: '16px',
    },
    showArrow: {
      position: 'absolute',
      top: '-13px',
      right: 0,
      '& svg': {
        fontSize: '14px',
      },
    },
    subheaderType: ({ notificationType }) => ({
      border: `1px solid ${typeColor[notificationType]}`,
      backgroundColor: typeColor[notificationType],
      display: 'inline-flex',
      padding: '1px 3px',
      borderRadius: 3,
      fontSize: '8px',
    }),
    subheader: {
      display: 'flex',
      fontSize: '10px',
      color: '#333',
      alignItems: 'center',
    },
    options: {
      position: 'absolute',
      bottom: 7,
      right: 7,
      '&::before': {
        content: '""',
        top: '-27px',
        left: '-29px',
        width: '128%',
        filter: 'blur(8px)',
        height: 45,
        zIndex: 1,
        position: 'absolute',
        background: '#ffffff',
      },
    },
    optionsText: {
      display: 'flex',
      fontSize: '10px',
      color: '#6a6a6a',
      alignItems: 'center',
      background: '#eaeaea',
      padding: '2px 5px',
      borderRadius: 5,
      transition: 'background 0.3s ease',
      userSelect: 'none',
      position: 'relative',
      zIndex: 2,
      '&:hover': {
        background: '#dddddd',
      },
      '& svg': {
        fontSize: '17px',
      },
    },
    notificationStatus: {
      display: 'block',
      textTransform: 'capitalize',
      padding: '1px 3px',
      textAlign: 'center',
      borderRadius: 3,
      marginLeft: 5,
      fontSize: 8,
    },
    ignored: {
      background: 'rgb(253, 236, 234)',
      color: 'rgb(97, 26, 21)',
      border: '1px solid rgb(255 222 218)',
    },
    claimed: {
      color: 'rgb(30, 70, 32)',
      backgroundColor: 'rgb(237, 247, 237)',
    },
    applied: {
      color: 'rgb(30, 70, 32)',
      backgroundColor: 'rgb(237, 247, 237)',
    },
  })
)
