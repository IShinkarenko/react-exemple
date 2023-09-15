import StepConnector from '@mui/material/StepConnector'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'

export default makeStyles(() =>
  createStyles({
    formInner: {
      width: 500,
      borderRadius: 9,
      backgroundColor: '#fff',
      padding: 20,
      margin: '0 auto',
      border: '1px solid rgba(0, 0, 0, 0.12)',
      '@media(max-width: 600px)': {
        width: '100%',
        padding: '5px 20px 20px 20px',
      },
    },
    stepFields: {
      maxWidth: 385,
      margin: '0 auto ',
      minHeight: 155,
      '& > div': {
        margin: '14px 0',
      },
    },
    stepper: {
      width: '100%',
      maxWidth: 550,
      margin: '0 auto',
      paddingLeft: 0,
      paddingRight: 0,
      backgroundColor: 'unset',
      '@media(max-width: 600px)': {
        '& > div': {
          paddingLeft: 4,
          paddingRight: 4,
        },
      },
    },
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 50,
      maxWidth: 385,
      margin: '50px auto 0',
      '& > button': {
        flex: 1,
      },
    },
    caption: {
      fontSize: '13px',
      color: 'rgba(0, 0, 0, 0.54)',
      textAlign: 'center',
      display: 'block',
      marginTop: 35,
    },
    link: {
      paddingBottom: '2px',
      borderBottom: '1px solid transparent',
      transition: 'all 0.3s ease',
      color: '#396dd0',
      cursor: 'pointer',
      marginLeft: 3,
      '&:hover': {
        borderColor: '#396dd0',
      },
    },
    captionSignIn: {
      marginTop: 5,
      fontWeight: 900,
      fontSize: '13px',
    },
    captionSignUp: {
      marginTop: 25,
      fontWeight: 900,
      fontSize: '17px',
    },
    labelContainer: {
      width: 67,
      '& > span': {
        fontSize: 12,
        transition: 'transform 0.2s ease',
        color: '#333',
      },
      '@media(max-width: 600px)': {
        width: '70px',
      },
    },
    activeLabel: {
      transform: 'scale(1.2)',
      textShadow: '0px 2px 3px rgb(0 0 0 / 20%)',
    },
    rootLabel: {
      transform: 'scale(1)',
    },
    completedLabel: {
      fontWeight: '400 !important',
    },
    stepTitle: {
      fontSize: 15,
      marginTop: 24,
    },
  })
)

export const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#74D3D1',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#74D3D1',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector)
