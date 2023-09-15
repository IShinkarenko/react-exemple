import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    icon: {
      color: 'rgba(0, 0, 0, 0.54)',
      marginRight: '12px',
      display: 'flex',
      '& svg': {
        fontSize: '22px',
      },
    },
    menuItem: {
      display: 'flex',
      alignItems: 'end',
    },
    iconButton: {
      padding: 7,
      '& svg': {
        fontSize: '19px',
      },
    },
    meu: {
      padding: 0,
    },
  })
)
