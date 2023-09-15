import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    container: {
      maxWidth: '820px',
      margin: '0 auto',
      width: '100%',
      padding: '0 8px',
      '& > form': {
        display: 'flex',
        flexDirection: 'column',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%',
      height: '40px',
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 0 14px',
      '& > div': {
        '&:first-child': {
          flex: 1,
        },
        '&:last-child': {
          flex: 0.5,
        },
      },
    },
    roleSelect: {
      minWidth: '214px',
    },
    emails: {
      width: '65%',
      minWidth: '500px',
      margin: '0 auto',
      marginTop: theme.spacing(6.4),
    },
    headerButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    memberForm: {
      height: '100%',
    },
    memberPaper: {
      height: '100%',
      padding: '24px',
    },
  })
)
