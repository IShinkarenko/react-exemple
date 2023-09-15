import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    item: {
      position: 'relative',
    },
    addIcon: {
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
  })
)
