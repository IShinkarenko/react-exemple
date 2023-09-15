import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    wrapper: {
      marginTop: 30,
      '& svg': {
        width: '100%',
      },
    },
    chartsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      // '@media(max-width: 580px)': {
      //   flexDirection: 'column',
      // },
    },
    chartSecondaryContainer: {
      display: 'flex',
      flex: 1,
      margin: '30px 0 ',
      '@media(max-width: 580px)': {
        flexWrap: 'wrap',
        flexDirection: 'column',
        '& > div:not(:last-child)': {
          marginBottom: '30px',
        },
      },
    },
    chartMain: {
      flex: 1,
      height: '230px',
      minWidth: '515px',
      margin: '30px 0 ',
      '@media(max-width: 580px)': {
        minWidth: 'unset',
      },
    },
    chartSecondary: {
      flex: 1,
      height: '150px',
      padding: '0 15px',
      minWidth: '175px',
    },
    audience: {
      width: '100%',
      height: '300px',
      maxWidth: '1170px',
    },
    audienceWrapper: {
      display: 'flex',
      padding: '30px 50px',
      '@media(max-width: 580px)': {
        minWidth: 'unset',
        padding: '30px 15px',
      },
    },
    audienceDetails: {
      width: '350px',
      padding: '10px 50px',
    },
    audienceDetailsCard: {
      padding: '30px',
      '& svg': {
        width: 'auto',
      },
    },
  })
)
