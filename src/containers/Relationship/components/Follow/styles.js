import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    relationshipFollow: {
      color: '#fff',
      boxShadow: 'unset',
      marginLeft: 24,
      textTransform: 'capitalize',
      fontSize: 12,
      height: 'auto',
      minHeight: 'unset',
      padding: '4px 8px',
      alignItems: 'center',
      '@media(max-width: 650px)': {
        marginLeft: 0,
      },
      '& svg': {
        fontSize: 17,
      },
      '&:before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '6px 7px 6px 0',
        borderColor: `transparent ${theme.palette.primary.main} transparent transparent`,
        left: '-7px',
      },
      '&:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
    relationshipFollowDialog: {
      padding: 0,
      marginTop: '-24px',
    },
    disabled: {
      '&:before': {
        borderColor: `transparent rgba(0, 0, 0, 0.12) transparent transparent`,
      },
    },
    listItem: {
      '& span': {
        fontSize: 13,
      },
    },
  })
)
