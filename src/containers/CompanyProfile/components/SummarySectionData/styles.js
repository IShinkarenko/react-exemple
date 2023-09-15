import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    profileSectionSummary: {
      position: 'absolute',
      height: 37,
      width: '100%',
      borderBottom: '1px solid #74D3D1',
      display: 'flex',
      alignItems: 'center',
      '&::after': {
        content: '""',
        position: 'absolute',
        background: '#f9f9fc', //'#f9f9fc',
        width: '100%',
        height: '100%',
        zIndex: '-1',
      },
      '& > div:first-child': {
        padding: '0 0 0 14px',
        '@media(max-width: 767px)': {
          padding: '0',
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
      },
      '& > div:last-child': {
        justifyContent: 'flex-end',
      },
      '@media(max-width: 767px)': {
        height: 58,
      },
    },
    profileSectionSummaryBlock: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
    },
    profileSectionSummaryItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 10px',
    },
    profileSectionSummaryItemName: {
      marginRight: 7,
      fontWeight: 500,
    },
    profileSectionButton: {
      margin: '0 9px',
      textTransform: 'capitalize',
      fontSize: 13,
      padding: '2px 9px',
    },
  })
)
