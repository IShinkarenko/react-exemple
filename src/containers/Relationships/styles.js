import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    relationshipsHeader: {
      display: 'flex',
      '@media(max-width: 650px)': {
        flexDirection: 'column',
        '& > div:last-child': {
          width: '100%',
          marginTop: '30px',
          '& > div': {
            width: '100%',
          },
        },
      },
    },
    container: {
      flex: 1,
      '& > div': {
        height: '100%',
      },
    },
  })
)
