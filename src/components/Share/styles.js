import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    shareIcon: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
    socialLinks: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      margin: '0 auto',
      marginTop: 30,
      gap: 14,
      '& > *': {
        flex: 1,
      },
    },
    socialItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: '14px 0',
      border: '1px solid #e4e4e4',
      borderRadius: 5,
      marginBottom: 10,
      transition: 'all 0.2s ease-in',
      '& p': {
        fontSize: 14,
        marginTop: 7,
      },
      '&:hover': {
        borderColor: '#333',
      },
    },
    link: {
      padding: '10px 0',
      marginTop: 20,
    },
    linkWrap: {
      padding: 15,
      backgroundColor: '#F8F9FA',
      borderRadius: 5,
      marginTop: 10,
      border: '1px solid transparent',
      transition: 'all 0.2s ease-in',
      '&:hover': {
        borderColor: '#333',
      },
    },
    copyLink: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      color: '#8A95A4',
      cursor: 'pointer',
    },
  })
)
