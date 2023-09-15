import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_ImporterFrame: {
      border: 'none',
      padding: 0,
      borderRadius: 0,
      background: 'transparent',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    CSVImporter_ImporterFrame__header: {
      display: 'flex',
      alignItems: 'center',
      border: '1px solid #f3f2f2',
      marginBottom: 30,
      background: '#f5f5f77d',
      borderRadius: 5,
      padding: 5,
    },
    CSVImporter_ImporterFrame__headerTitle: {},
    CSVImporter_ImporterFrame__headerCrumbSeparator: {
      flex: 'none',
      display: 'flex',
      marginRight: '0.5em',
      marginLeft: '0.5em',
      fontSize: '1.2em',
      opacity: 0.5,
      '& > span': {
        display: 'block',
        width: '1em',
        height: '1em',

        backgroundImage:
          'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02eiI+PC9wYXRoPjwvc3ZnPg==")',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      },
    },
    CSVImporter_ImporterFrame__headerSubtitle: {
      flex: 'none',
      paddingBottom: '0.1em',
      fontSize: '1.15em',
      color: '#202020',
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
    CSVImporter_ImporterFrame__footer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '1.2em',
    },
    CSVImporter_ImporterFrame__footerFill: {
      flex: '1 1 0',
    },
    CSVImporter_ImporterFrame__footerError: {
      flex: 'none',
      marginRight: '1em',
      lineHeight: 0.8,
      color: '#c00000',
      wordBreak: 'break-word',
    },
    CSVImporter_ImporterFrame__footerSecondary: {
      flex: 'none',
      display: 'flex',
      marginRight: '1em',
    },
  })
)
