import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    switchCompany: {
      minWidth: '280px',
      width: 300,
    },
    switchTitle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 9px 11px 15px',
      borderBottom: '1px solid #ddd',
      fontWeight: '500',
      fontSize: '13px',
      outline: 'none',
      '& svg': {
        fontSize: '18px',
        cursor: 'pointer',
        opacity: 0.5,
        transition: 'opacity 0.2s ease',
      },
      '&:hover': {
        '& svg': {
          opacity: 1,
        },
      },
    },
    switchOption: {
      display: 'flex',
      alignItems: 'center',
      padding: '11px 15px',
      fontSize: '13px',
      color: '#24292e',
      cursor: 'pointer',
      '& svg': {
        fontSize: '16px',
        marginRight: '5px',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    searchText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px 7px',
    },
    companiesContainer: {
      position: 'relative',
      height: 163,
      overflow: 'auto',
      borderBottom: '1px solid #ddd',
      borderTop: '1px solid #ddd',
    },
    searchField: {
      padding: '0px',
      background: '#fff',
      width: 'auto',
      '& > div > div': {
        backgroundColor: '#fff',
        height: 'auto',
        borderRadius: 5,
      },
    },
  })
)
