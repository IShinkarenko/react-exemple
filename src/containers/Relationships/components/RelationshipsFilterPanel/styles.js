import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    filters: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '15px 14px',
      '@media(max-width: 1080px)': {
        flexDirection: 'column',
      },
    },
    clearAllBtnLabel: {
      display: 'none',
      '@media(max-width: 1080px)': {
        display: 'block',
      },
    },
  })
)
