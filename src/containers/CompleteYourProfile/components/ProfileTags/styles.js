import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    searchTagsWrap: {
      display: 'flex',
      width: '100%',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 15,
      '& > div': {
        flex: '0 0 48%',
        margin: '8px 0',
        maxWidth: '48%',
      },
      '@media(max-width: 767px)': {
        flexDirection: 'column',
        '& > div': {
          flex: 1,
          maxWidth: 'unset',
        },
      },
    },
    saveBtn: {
      minWidth: 102,
      fontSize: 12,
      color: '#fff',
      textTransform: 'capitalize',
      marginTop: 22,
    },
  })
)
