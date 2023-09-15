import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    channelContainer: {
      flex: 1,
    },
    title: {
      '& h6': {
        fontSize: 28,
        fontWeight: 500,
      },
    },
    editField: {
      minWidth: '200px',
    },
    channelHead: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 'auto',
      flexShrink: 0,
      padding: '8px 0',
      '@media(max-width: 1170px)': {
        flexDirection: 'column',
        alignItems: 'unset',
        '& > div:last-child': {
          marginBottom: '30px',
        },
      },
    },
  })
)
