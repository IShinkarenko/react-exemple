import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { typeColor } from 'containers/NotificationsBar/constants'

export default makeStyles(() =>
  createStyles({
    drawerPaper: {
      zIndex: '1500',
    },
    drawerInner: {
      width: '400px',
      padding: '14px 25px 15px',
      position: 'relative',
      height: '100%',
      '& h6': {
        marginBottom: '15px',
      },
    },
    backIcon: {
      position: 'absolute',
      top: 5,
      left: 5,
      '& svg': {
        fontSize: 17,
      },
    },
    subHeaderType: ({ notificationType }) => ({
      fontSize: '10px',
      display: 'inline-block',
      border: `1px solid ${typeColor[notificationType]}`,
      borderRadius: 3,
      padding: '3px 5px',
      lineHeight: 1,
      backgroundColor: typeColor[notificationType],
      color: '#333',
      marginBottom: '5px',
    }),
  })
)
