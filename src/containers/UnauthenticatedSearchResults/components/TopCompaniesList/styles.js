import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    searchResultsTop: {
      position: 'relative',
      '&:hover $hidden': {
        opacity: 1,
        visibility: 'visible',
      },
    },
    searchItemTop: {
      padding: 14,
      backgroundColor: '#fff',
      boxShadow: 'none',
      border: '1px solid #dfe1e5',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      margin: '14px 7px',
      boxShadow: 'initial',
      transform: 'scale3d(1,1,1)',
      transition: 'all 0.2s ease',
      boxShadow: '2px 4px 8px rgb(0 0 0 / 4%)',
      willChange: 'transform',
      alignItems: 'flex-start',
      '&:hover': {
        boxShadow: '2px 4px 16px rgb(0 0 0 / 15%)',
      },
    },
    searchItemTopName: {
      cursor: 'pointer',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    subList: {
      listStyle: 'none',
      padding: 0,
      display: 'flex',
      margin: '0px 0 14px 0',
      alignItems: 'flex-start',
      '& li': {
        padding: 0,
        lineHeight: 0,
        position: 'relative',
        paddingLeft: 5,
        '&:first-child': {
          paddingRight: 9,
          paddingLeft: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 4,
            height: 4,
            right: 0,
            borderRadius: '50%',
            top: '50%',
            transform: 'translate(0, -50%)',
            backgroundColor: '#333',
          },
        },
      },
      '& span': {
        lineHeight: 1,
      },
    },
    hidden: {
      opacity: 0,
      visibility: 'hidden',
      transition: 'all 0.3s ease',
    },
    shadow: {
      width: 180,
      right: '0',
      position: 'absolute',
      height: '100%',
      top: 0,
      // background: 'linear-gradient(90deg,rgba(255, 255, 255, .40) 0%,#fff 80%)',
      zIndex: 10,
    },
    expandResults: {
      backgroundColor: '#fff',
      position: 'absolute',
      right: '50px',
      top: '50%',
      transform: 'translate(0, -50%)',
      zIndex: 100,
      width: 50,
      height: 50,
      boxShadow: '0 0 0 1px rgb(0 0 0 / 4%), 0 4px 8px 0 rgb(0 0 0 / 20%)',
      '&:hover': {
        backgroundColor: '#fff',
        '& svg': {
          opacity: 0.85,
        },
      },
      '& svg': {
        opacity: 0.65,
      },
    },
    button: {
      backgroundColor: '#fff',
      boxShadow: '0 0 0 1px rgb(0 0 0 / 4%), 0 4px 8px 0 rgb(0 0 0 / 20%)',
      '&:hover': {
        backgroundColor: '#fff',
      },
    },
    showAllCompanies: {
      justifyContent: 'center',
      alignItems: 'center',
      '& p': {
        margin: '0 0 7px 0',
      },
    },
  })
)
