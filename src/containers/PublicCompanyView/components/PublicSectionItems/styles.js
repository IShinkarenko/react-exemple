import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    sectionPanel: {
      padding: '24px 40px 0',
      '@media(max-width: 767px)': {
        padding: '24px 7px 0',
      },
    },
  })
)
