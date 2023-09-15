import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    active: {
      borderColor: theme.palette.primary.main,
      backgroundColor: 'rgb(116 211 209 / 0.05)',
    },
  })
)
