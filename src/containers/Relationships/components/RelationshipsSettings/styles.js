import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    chipsField: {
      margin: 0,
    },
    chipsWrap: {
      display: 'flex',
      padding: '50px 16px',
      justifyContent: 'center',
      '& > div:not(:last-child)': {
        marginRight: '30px',
      },
    },
    chipsInner: {
      display: 'flex',
      flexDirection: 'column',
      width: '800px',
      '& > div:not(:last-child)': {
        marginBottom: '30px',
      },
      '@media(max-width: 1170px)': {
        width: '100%',
      },
    },
    smartChip: {
      display: 'flex',
      '& > *:nth-child(1)': {
        order: 2,
        marginRight: 15,
        marginLeft: 0,
        fontSize: '17px',
      },
      '& > *:nth-child(2)': {
        order: 1,
      },
      '& > *:nth-child(3)': {
        order: 3,
      },
    },
    description: {
      padding: '17px 25px',
      borderLeft: '4px solid #74D3D1',
      backgroundColor: '#f5f5f5',
      '& > h5': {
        marginBottom: '10px',
      },
    },
  })
)
