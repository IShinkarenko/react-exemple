import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#74D3D1',
    },
    secondary: {
      main: '#4B4B4B',
    },
    error: {
      main: '#dc0020',
    },
    background: {
      default: '#fff',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontSize: 27,
          fontWeight: 500,
          lineHeight: 1.57,
        },
        h4: {
          fontSize: 22,
          fontWeight: 500,
          lineHeight: 1.57,
        },
        h5: {
          fontSize: 20,
          fontWeight: 500,
          lineHeight: 1.57,
        },
        h6: {
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.57,
        },
        subtitle1: {
          fontWeight: 'normal',
          letterSpacing: '0.25px',
          lineHeight: '1.43',
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#4B4B4B',
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '40px',
          color: '#74D3D1',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1.05rem',
        },
        textColorPrimary: {
          '&.Mui-selected': {
            color: '#4DD7DC',
          },
        },
      },
    },

    MuiSwitch: {
      styleOverrides: {
        colorPrimary: {
          '&.Mui-checked': {
            color: '#74D3D1',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        marginNormal: {
          marginBottom: '16px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          color: '#4B4B4B',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#fff',
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: 'rgb(116 211 209 / 18%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '@media(max-width: 580px)': {
            whiteSpace: 'unset',
            minHeight: 32,
            padding: '5px 0',
            height: 'auto',
          },
        },
        label: {
          '@media(max-width: 580px)': {
            whiteSpace: 'unset',
          },
        },
      },
    },
  },
})

export default theme
