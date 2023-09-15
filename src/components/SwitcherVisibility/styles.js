import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    switcher: {
      cursor: 'pointer',
      minWidth: '121px',
      '@media(max-width: 580px)': {
        minWidth: 'unset',
        width: '107px',
        '& span': {
          fontSize: '13px',
        },
      },
    },
    menuItem: {
      fontSize: '14px',
    },
  })
)
