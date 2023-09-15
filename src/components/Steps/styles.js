import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: '820px',
      padding: 0,
      margin: '0 auto',
      overflow: 'auto',
      whiteSpace: 'nowrap',
      '& .MuiStepConnector-vertical': {
        padding: '0',
      },
    },
    stepper: {
      padding: '24px 0',
      [theme.breakpoints.down('xl')]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        width: 300,
        maxWidth: 600,
      },
    },
    stepLabel: {
      '& span': {
        lineHeight: '1.29',
      },
    },
  })
)
