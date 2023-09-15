import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    preferencesTable: {
      '& tbody': {
        '& tr:first-child': {
          height: '70px',
        },
      },
    },
    select: {
      width: '100%',
      maxWidth: 400,
      margin: 0,
    },
    preferenceContainer: {
      padding: 24,
    },
    preferenceHead: {
      display: 'flex',
      marginBottom: 32,
    },
    preferenceDescr: {
      fontSize: 15,
      color: '#5e5e5e',
      marginLeft: 14,
    },
    selectPaper: {
      maxHeight: 400,
    },
  })
)
