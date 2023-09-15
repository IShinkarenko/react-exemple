import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    upgradeeButton: {
      textTransform: 'capitalize',
      fontSize: 14,
      boxShadow: 'unset',
      '& svg': {
        fontSize: '17px !important',
      },
    },
    resetPadding: {
      padding: 0,
    },
    dialogAutosuggest: {
      '& h2': {
        margin: 0,
      },
    },
    expanded: {
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
    suggestedAccordionSummary: {
      display: 'flex',
      alignItems: 'center',
    },
    upgradeProfile: {
      flex: 0.5,
      color: '#2d7d80',
    },
    upgradeCTA: {
      color: '#fff',
      backgroundColor: '#74d3d1',
      padding: '2px 3px',
      borderRadius: 3,
      cursor: 'pointer',
      border: '1px solid transparent',
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#74d3d1',
        borderColor: '#74d3d1',
      },
    },
  })
)
