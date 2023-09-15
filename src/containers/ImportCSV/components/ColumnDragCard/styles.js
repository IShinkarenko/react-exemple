import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_ColumnDragCard: {
      position: 'relative',
      zIndex: 0,
      padding: '0.5em 0.75em',
      borderRadius: '5px',
      background: '#fff',
      boxShadow: '0 1px 1px rgba(#000, 0.25)',
      cursor: 'default',
      '&[data-draggable="true"]': {
        cursor: 'grab',
        touchAction: 'none',
      },
      '&[data-dummy="true"]': {
        borderRadius: 3,
        background: '#f0f0f0',
        boxShadow: 'none',
        opacity: 0.5,
        userSelect: 'none',
        border: '1px dashed #333',
      },

      '&[data-error="true"]': {
        background: 'rgba(#c00000, 0.25)',
        color: '#202020',
      },

      '&[data-shadow="true"]': {
        background: '#f0f0f0',
        boxShadow: 'none',
        color: 'rgba(#202020, 0.25)',
      },

      '&[data-drop-indicator="true"]': {
        boxShadow: '0 1px 2px rgba(#000, 0.5)',
        color: '#000',
      },
    },

    CSVImporter_ColumnDragCard__cardHeader: {
      marginTop: '-0.25em',
      marginRight: '-0.5em',
      marginBottom: '0.25em',
      marginLeft: '-0.5em',
      height: '1.5em',
      fontWeight: 'bold',
      color: '#808080',
      '& > b': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: '#f0f0f0',
        lineHeight: 1,
      },
      '& > var': {
        display: 'block',
        marginBottom: '-1px',
        width: 1,
        height: 1,
        overflow: 'hidden',
      },
    },

    CSVImporter_ColumnDragCard__cardValue: {
      marginTop: '0.25em',
      overflow: 'hidden',
      lineHeight: '1.25em',
      fontSize: '0.75em',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',

      '&[data-header="true"]': {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#808080',
      },
      '& + div': {
        marginTop: 0,
      },
    },
  })
)
