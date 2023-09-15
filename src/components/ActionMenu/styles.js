import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    actionButtonIcon: {
      position: 'absolute',
      right: '0px',
      color: '#000',
      zIndex: 10,
      top: '50%',
      transform: 'translate(0, -50%)',
      '& svg': {
        fontSize: 17,
      },
      '&:hover': {
        backgroundColor: 'rgba(236, 234, 234, 0.43) !important',
      },
    },
    options: {
      padding: '7px 16px',
      '& span': {
        fontSize: '15px',
      },
      '& svg': {
        fontSize: '20px',
      },
    },
  })
)
