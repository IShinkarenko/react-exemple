import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    localtionContainer: {
      display: 'flex',
      '& > div': {
        flex: 1,
        width: 'auto',
        marginRight: 15,
      },
      '@media(max-width: 550px)': {
        flexDirection: 'column',
        '& > div': {
          margin: '5px 0 15px 0',
        },
      },
    },
  })
)
