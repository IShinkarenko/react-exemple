import { Box } from '@mui/material'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import MainLayout from 'layouts/MainLayout'

const useStyles = makeStyles(() =>
  createStyles({
    notFound: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      '& h2': {
        fontSize: 17,
        fontWeight: 400,
        textTransform: 'uppercase',
        color: '#000',
        marginTop: 0,
        marginBottom: 25,
      },
    },
    notFoundWrap: {
      position: 'relative',
      height: 240,
      display: 'flex',
      justifyContent: 'center',
      '& h3': {
        position: 'relative',
        fontSize: 16,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: '#262626',
        margin: 0,
        letterSpacing: 3,
        paddingLeft: 6,
      },
    },
    title: {
      fontFamily: 'Montserrat, sans-serif',
      position: 'absolute',
      left: '50%',
      top: '50%',
      WebkitTransform: 'translate(-50%,-50%)',
      MsTransform: 'translate(-50%,-50%)',
      transform: 'translate(-50%,-50%)',
      fontSize: 232,
      fontWeight: 900,
      margin: 0,
      color: '#74d3d1',
      textTransform: 'uppercase',
      letterSpacing: '-40px',
      marginLeft: '-20px',
      '& > span': {
        textShadow: '-8px 0 0 #f9f9fc',
      },
    },
  })
)

const Custom404 = () => {
  const classes = useStyles()

  return (
    <Box className={classes.notFound}>
      <Box className={classes.notFoundWrap}>
        <h3>Oops! Page not found</h3>
        <h1 className={classes.title}>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>
      </Box>
      <h2>we are sorry, but the page you requested was not found</h2>
    </Box>
  )
}

export default Custom404

Custom404.getLayout = (page) => (
  <MainLayout sidebar={false} fullWidth>
    {page}
  </MainLayout>
)
