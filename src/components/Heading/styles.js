import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    dragIndicatorIcon: {
      fontSize: 15,
    },
    dragSuggestion: {
      color: theme.palette.action.disabled,
      maxWidth: '140px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'block !important',
      fontSize: 15,
      paddingLeft: 7,
    },
    dragText: {
      maxWidth: '140px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'block !important',
      fontSize: 15,
      paddingLeft: 7,
    },
  })
)
