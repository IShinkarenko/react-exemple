import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    securityTable: {
      '& tbody': {
        '& tr:first-child': {
          height: '70px',
        },
      },
    },
    passTitle: {
      fontSize: '14px',
      color: '#000',
      letterSpacing: '0.25px',
      marginBottom: theme.spacing(3.2),
      lineHeight: 1.9,
    },
    passRecomend: {
      letterSpacing: '0.25px',
      marginBottom: 0,
    },
    tableRowEdit: {
      verticalAlign: 'top',
      lineHeight: 1.4,
      '& > td': {
        paddingTop: theme.spacing(3.2),
      },
    },
    securityField: {
      maxWidth: '500px',
    },
    errorIcon: {
      marginRight: '7px',
    },
  })
)
