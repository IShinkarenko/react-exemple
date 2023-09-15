import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    companyInfoItem: {
      display: 'flex',
      marginTop: 9,
    },
    itemTitleBox: {
      minWidth: 120,
      marginBottom: 4,
      display: 'flex',
      alignItems: 'center',
      '& svg': {
        marginLeft: 5,
        fontSize: 14,
      },
    },
    itemTitle: {
      fontSize: 14,
      color: '#8d8d8d',
    },
    itemValue: {
      fontSize: 14,
      fontWeight: 500,
      flex: 1,
    },
    columnClass: {
      marginRight: 30,
      '& > p:first-child': {
        width: 'auto',
        marginBottom: 2,
      },
      '@media(max-width: 767px)': {
        marginRight: 0,
      },
    },
  })
)
