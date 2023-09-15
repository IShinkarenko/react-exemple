import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragTargetArea: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
    },
    CSVImporter_ColumnDragTargetArea__box: {
      flexBasis: '12.5%',
      flexGrow: 0,
      flexShrink: 1,
      width: 0,
      paddingTop: '2em',
      paddingRight: '1em',
    },
    CSVImporter_ColumnDragTargetArea__boxLabel: {
      fontSize: 14,
      marginBottom: '0.25em',
      fontWeight: 'bold',
      color: '#202020',
      wordBreak: 'break-word',
      '& > b': {
        marginLeft: '0.25em',
        color: '#c00000',
      },
    },
    CSVImporter_ColumnDragTargetArea__boxValue: {
      position: 'relative',
      zIndex: 0,
      boxShadow: '0px 2px 1px 0px rgb(0 0 0 / 7%), 0px 2px 3px 0px rgb(0 0 0 / 7%), 0px 1px 6px 3px rgb(0 0 0 / 7%)',
      borderRadius: 3,
    },
    CSVImporter_ColumnDragTargetArea__boxPlaceholderHelp: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '98%',
      color: '#808080',
      padding: 5,
      fontSize: 13,
      textAlign: 'center',
    },
    CSVImporter_ColumnDragTargetArea__boxValueAction: {
      position: 'absolute',
      top: 0,
      right: 0,
      zIndex: 1,
    },
  })
)
