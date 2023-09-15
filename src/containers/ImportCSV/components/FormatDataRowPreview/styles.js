import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_FormatDataRowPreview: {
      maxHeight: '12em',
      minHeight: '6em',
      border: '1px solid #808080',
      overflow: 'scroll',
      borderRadius: 5,
    },
    CSVImporter_FormatDataRowPreview__table: {
      width: '100%',
      borderSpacing: 0,
      borderCollapse: 'collapse',
      '& > thead > tr > th': {
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: '#808080',
        borderRight: '1px solid rgba(#808080, 0.5)',
        padding: '0.5em 0.5em',
        lineHeight: 1,
        fontSize: '0.75em',
        whiteSpace: 'nowrap',
        '&:last-child': {
          borderRight: 'none',
        },
      },
      '& > tbody > tr > td': {
        borderRight: '1px solid rgba(#808080, 0.5)',
        padding: '0.5em 0.5em',
        lineHeight: 1,
        fontSize: '0.75em',
        whiteSpace: 'nowrap',
        '&:last-child': {
          borderRight: 'none',
        },
      },
      '& thead + tbody > tr:first-child > td': {
        paddingTop: 0,
      },
      '& tbody > tr + tr > td': {
        paddingTop: 0,
      },
    },
  })
)
