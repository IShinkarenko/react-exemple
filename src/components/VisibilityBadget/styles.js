import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { sectionLevelColor } from 'constant'

export default makeStyles(() =>
  createStyles({
    badget: ({ visibilityLevel }) => ({
      backgroundColor: sectionLevelColor[visibilityLevel],
      display: 'block',
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: 'green',
      marginRight: '5px',
    }),
    tooltip: {
      fontSize: '15px',
      position: 'relative',
    },
  })
)
