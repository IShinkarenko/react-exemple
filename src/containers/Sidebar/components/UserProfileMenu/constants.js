import LockIcon from '@mui/icons-material/Lock'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import routes from 'routes'

export const userLinks = [
  {
    title: 'Profile',
    route: routes.userProfile,
    icon: <PersonIcon />,
  },
  {
    title: 'Security',
    route: routes.userSecurity,
    icon: <LockIcon />,
  },
  {
    title: 'Preferences',
    route: routes.userPreferences,
    icon: <SettingsIcon />,
  },
]
