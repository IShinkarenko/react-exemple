import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    searchSelectWrap: {
      minWidth: '200px',
      position: 'relative',
    },
    checkbox: {
      padding: 0,
      marginRight: '3px',
    },
    active: {
      backgroundColor: 'rgb(116 211 209 / 0.1)',
      borderColor: theme.palette.primary.main,
    },
    searchField: {
      position: 'relative',
      '& > div': {
        paddingLeft: 0,
      },
    },
    adornment: {
      position: 'absolute',
      left: '15px',
      '& + div': {
        paddingLeft: 45,
      },
    },
    selectRoot: {
      paddingLeft: '50px',
    },
    menuItem: {
      paddingTop: 2,
      paddingBottom: 2,
    },
  })
)
