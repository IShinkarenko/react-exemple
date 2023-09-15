import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    relationsTable: {
      '& td, th': {
        '@media(max-width: 500px)': {
          padding: '16px 5px',
          fontSize: '12px',
        },
      },
    },
    searchField: {
      padding: '0px',
      background: '#fff',
      width: 180,
      '& > div > div': {
        backgroundColor: '#fff',
        height: 'auto',
        borderRadius: 5,
      },
    },
    relationshipsTollbar: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      '@media(max-width: 500px)': {
        flexDirection: 'column-reverse',
        alignItems: 'flex-start',
      },
    },
  })
)
