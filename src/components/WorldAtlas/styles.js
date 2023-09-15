import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%',
    },

    label: {
      justifyContent: 'flex-start',
      textAlign: 'left',
    },
    labelReverse: {
      justifyContent: 'flex-end',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    provinceButton: {
      textTransform: 'capitalize',
      justifyContent: 'flex-start',
      '& + &': {
        marginLeft: 0,
      },
    },
    provinceWrap: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gridTemplateRows: 'repeat(1, minmax(30px, 1fr))',
      gridColumnGap: '10px',
      gridRowGap: '10px',
    },
    groupWrap: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: '0 30px',
      '@media(max-width: 767px)': {
        padding: 0,
      },
    },
    map: {
      width: '100%',
      marginTop: '-50px',
      marginBottom: '-60px',
      '@media(max-width: 550px)': {
        marginTop: '0',
        marginBottom: '0',
      },
    },
    mapContainer: {
      display: 'flex',
      justifyContent: 'center',
      '@media(max-width: 767px)': {
        flexDirection: 'column',
      },
    },
  })
)
