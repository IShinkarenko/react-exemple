import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    relationshipProfile: {
      display: 'flex',
      flex: 1,
      width: '100%',
    },
    relationshipGeneralInfo: {
      flex: '0 0 25vw',
      backgroundColor: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.13)',
      borderRadius: 5,
    },
    relationshipAdditionalInfo: {
      flex: 1,
      backgroundColor: '#fff',
      border: '1px solid rgba(0, 0, 0, 0.07)',
      borderRadius: 5,
    },
    relationshipTabs: {
      display: 'flex',
      padding: '0 21px',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      '& > div > div': {
        display: 'block',
      },
      '& button': {
        fontSize: 15,
      },
    },
    relationshipLogo: {
      display: 'flex',
      justifyContent: 'center',
      padding: '24px 24px 14px',
    },
    relationshipAvatar: {
      width: 80,
      height: 80,
      marginRight: 14,
    },
    relationshipHead: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      flex: 0.7,
    },
    relationshipFields: {
      padding: '14px 19px',
    },
    relationshipField: {
      marginRight: 0,
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      flexWrap: 'wrap',
      '& > *': {
        flex: 1,
      },
      '& > *:last-child': {
        flex: '0.55',
      },
    },
    relationshipSocialLinks: {
      border: '1px solid rgba(0, 0, 0, 0.07)',
      marginTop: 14,
      padding: '0 14px 9px 14px',
      borderRadius: 5,
      position: 'relative',
      '& > div': {
        marginTop: 18,
        marginRight: 0,
      },
    },
    addSocialLinkBtn: {
      position: 'absolute',
      right: 14,
      margin: 0,
      top: 10,
      '& svg': {
        fontSize: 19,
      },
      '& button': {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        border: '1px solid transparent',
        '&:hover': {
          backgroundColor: 'transparent',
          borderColor: theme.palette.primary.main,
          color: theme.palette.primary.main,
        },
      },
    },
    relationshipGeneralInfoTop: {
      padding: 19,
      display: 'flex',
      alignItems: 'center',
    },
    expandBnt: {
      boxShadow: 'none',
      color: '#fff',
      height: 43,
      width: '100%',
      maxWidth: 200,
    },
    relationshipName: {
      fontSize: 19,
      fontWeight: 500,
    },
  })
)
