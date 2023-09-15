import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import { sectionLevelColor } from 'constant'

export default makeStyles(() =>
  createStyles({
    badget: ({ visibilityLevel }) => ({
      backgroundColor: sectionLevelColor[visibilityLevel],
      display: 'block',
      borderRadius: '5px',
      color: '#fff',
      fontSize: 12,
      padding: '2px 7px',
      top: 0,
      right: '10%',
    }),
  })
)
