import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles((theme) =>
  createStyles({
    label: {
      width: '25px',
      height: '25px',
      backgroundColor: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      fontSize: '13px',
    },
    channelSettingsWrap: {
      maxWidth: '908px',
    },

    channelSettingsContainer: {
      padding: 24,
    },
    channelSettingTitle: {
      fontSize: 17,
      marginBottom: 24,
    },
    channelSettingItem: {
      display: 'flex',
      alignItems: 'baseline',
      marginBottom: 32,
    },
    channelSettingField: {
      marginBottom: 19,
    },
    itemValue: {
      fontSize: 14,
      fontWeight: 500,
    },
    channelSettingsDescr: {
      marginTop: 14,
      marginBottom: 24,
      fontSize: 16,
      color: '#424242',
    },
  })
)
