import AssessmentIcon from '@mui/icons-material/Assessment'
import GroupIcon from '@mui/icons-material/Group'
import SearchIcon from '@mui/icons-material/Search'
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle'
import WorkIcon from '@mui/icons-material/Work'
import { ANALYTICS, ASSISTED_RESEARCH, COMPANY_PROFILE, RELATIONSHIPS, TEAM_MEMBERS } from 'constant'
import routes from 'routes'

export const links = (t) => [
  {
    title: t('Company Profile'),
    route: routes.companyProfile,
    icon: <WorkIcon />,
    type: COMPANY_PROFILE,
  },
  {
    title: t('Analytics'),
    route: routes.companyAnalytics,
    icon: <AssessmentIcon />,
    type: ANALYTICS,
  },
  {
    title: t('Team Members'),
    route: routes.companyMembers,
    icon: <GroupIcon />,
    type: TEAM_MEMBERS,
  },
  {
    title: t('Relationships'),
    route: routes.companyRelationships,
    icon: <SupervisedUserCircleIcon />,
    type: RELATIONSHIPS,
  },
  {
    title: t('Assisted Research'),
    route: routes.companyAssistedResearch,
    icon: <SearchIcon />,
    type: ASSISTED_RESEARCH,
  },
]
