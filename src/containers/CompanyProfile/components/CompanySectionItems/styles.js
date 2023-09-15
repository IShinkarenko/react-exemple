import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    sectionPanel: {
      padding: '24px',
      '@media(max-width: 767px)': {
        padding: '24px 7px 0',
      },
    },
    companySectionItemWrapper: {
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      transition: 'all 0.3s ease',
      position: 'relative',
      borderRadius: 3,
      padding: 7,
      '&:hover': {
        backgroundColor: '#f9f9fc',
        borderColor: '#ddd',
        '& $companySectionItemActions': {
          opacity: 1,
        },
      },
      '& > div > div': {
        margin: 0,
      },
    },
    companySectionItemActions: {
      position: 'absolute',
      top: 7,
      right: 7,
      display: 'flex',
      alignItems: 'center',
      opacity: 0,
      transition: 'all 0.3s ease',
      '& > *': {
        margin: '0 5px',
      },
    },
    emptyItemsFallback: {
      textAlign: 'center',
    },
    emptyItemsSubtitle: {
      position: 'relative',
      marginBottom: 50,
    },
    emptyItemsIcon: {
      width: 40,
      position: 'absolute',
      transform: 'scaleY(-1) rotate(71deg) translate(0, -50%)',
      marginLeft: 45,
      right: '50%',
      top: '100%',
    },
    addSectionItemButton: {
      width: 40,
      height: 40,
    },
  })
)
