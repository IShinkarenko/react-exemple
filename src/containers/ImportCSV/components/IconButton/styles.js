import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(() =>
  createStyles({
    CSVImporter_IconButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      width: '3em',
      height: '3em',
      border: 0,
      padding: 0,
      borderRadius: '50%',
      background: 'transparent',
      fontSize: 'inherit',
      color: '#000',
      cursor: 'pointer',
      '&:hover:not(:disabled)': {
        background: 'rgba(#808080, 0.25)',
      },

      '&:disabled': {
        cursor: 'default',
      },

      '&[data-small="true"]': {
        width: '2em',
        height: '2em',
      },

      '&[data-focus-only="true"]': {
        opacity: 0,
        pointerEvents: 'none',
        '&:focus': {
          opacity: 1,
        },
      },
      '& > span': {
        display: 'block',
        width: '1.75em',
        height: '1.75em',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        '&[data-type="back"]': {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE1LjQxIDcuNDFMMTQgNmwtNiA2IDYgNiAxLjQxLTEuNDFMMTAuODMgMTJ6Ij48L3BhdGg+PC9zdmc+")',
        },
        '&[data-type="forward"]': {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEwIDZMOC41OSA3LjQxIDEzLjE3IDEybC00LjU4IDQuNTlMMTAgMThsNi02eiI+PC9wYXRoPjwvc3ZnPg==")',
        },
        '&[data-type="replay"]': {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDVWMUw3IDZsNSA1VjdjMy4zMSAwIDYgMi42OSA2IDZzLTIuNjkgNi02IDYtNi0yLjY5LTYtNkg0YzAgNC40MiAzLjU4IDggOCA4czgtMy41OCA4LTgtMy41OC04LTgtOHoiPjwvcGF0aD48L3N2Zz4=")',
        },
        '&[data-type="arrowBack"]': {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwIDExSDcuODNsNS41OS01LjU5TDEyIDRsLTggOCA4IDggMS40MS0xLjQxTDcuODMgMTNIMjB2LTJ6Ij48L3BhdGg+PC9zdmc+")',
        },
        '&[data-type="close"]': {
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZvY3VzYWJsZT0iZmFsc2UiIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE5IDYuNDFMMTcuNTkgNSAxMiAxMC41OSA2LjQxIDUgNSA2LjQxIDEwLjU5IDEyIDUgMTcuNTkgNi40MSAxOSAxMiAxMy40MSAxNy41OSAxOSAxOSAxNy41OSAxMy40MSAxMnoiPjwvcGF0aD48L3N2Zz4=")',
        },
      },
      '&:disabled > span': {
        opacity: 0.25,
      },

      '&[data-small="true"] > span': {
        fontSize: '0.75em',
      },
    },
  })
)
