import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    link: ({ isActive }) => ({
      backgroundColor: isActive ? 'rgba(0, 0, 0, 0.04)' : '',
    }),
    href: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87)',
      display: 'flex',
      width: '100%',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
)
