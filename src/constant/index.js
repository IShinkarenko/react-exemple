export const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://develop-app.expandigo.com'

export const COMPANYPROFILESECTION = 'CompanyProfileSection'
export const SIGN_IN = 'signIn'
export const SIGNED_IN = 'signedIn'
export const SIGNED_OUT = 'signedOut'
export const SIGN_OUT = 'signOut'
export const SIGN_UP = 'signUp'
export const CONFIRM_SIGN_UP = 'confirmSignUp'
export const RESET_PASSWORD = 'resetPassword'
export const RESET_PASSWORD_SUBMIT = 'resetPasswordSubmit'
export const LOADING = 'loading'
export const NEW = 'New'
export const ACTIVE = 'Active'
export const DISABLED = 'Disabled'
export const INACTIVE = 'Inactive'
export const ADD = 'Add'
export const EDIT = 'Edit'
export const DELETE = 'Delete'
export const KEYWORD = 'Keyword'
export const OFFLINE = 'Offline'
export const BY_REQUEST_ONLY = 'ByRequestOnly'
export const PRIVATE_NETWORK_ONLY = 'PrivateNetworkOnly'
export const PUBLIC_NETWORK = 'PublicNetwork'
export const DEFAULT_COMPANY = 'DefaultCompany'
export const DEFAULT_CHANNEL = 'DefaultChannel'
export const DEFAULT_CHANNEL_NONE = 'None'
export const INSTANCE_STATUS_SUGGESTED = 'Suggested'
export const ZENDESK_KEY = 'efb35991-a871-4ebb-8657-27379717062e'
export const TEXT = 'text'
export const PHONE = 'phone'
export const URL = 'url'
export const NUMBER = 'number'
export const SELECT = 'select'
export const CLAIM = 'Claim'
export const TEXT_SUMMARY = 'TextSummary'
export const NOT_FOUND = 'NotFound'

export const WIZZARD_SEARCH = 'wizzard'
export const TRADITIONAL_SEARCH = 'traditional'

export const EXPANSION_CREDIT = 'ExpansionCredit'
export const CONNECTION_CREDIT = 'ConnectionCredit'
export const RELATIONSHIP_CREDIT = 'RelationshipCredit'

export const COMPANY_PROFILE = 'CompanyProfile'
export const ANALYTICS = 'Analytics'
export const TEAM_MEMBERS = 'TeamMembers'
export const RELATIONSHIPS = 'Relationships'
export const ASSISTED_RESEARCH = 'AssistedResearch'
export const CHANNELS = 'Channels'

export const languageLabels = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  pt: 'Português',
}

export const ZENDESK_SETTINGS = {
  color: {
    launcher: '#009687',
    launcherText: '#fff',
  },
  launcher: {
    chatLabel: {
      'en-US': 'Need Help',
    },
  },
  contactForm: {
    fields: [{ id: 'description', prefill: { '*': 'My pre-filled description' } }],
  },
  webWidget: {
    zIndex: 1300,
  },
}

export const sectionLevelColor = {
  Offline: '#ffbf00',
  PrivateNetworkOnly: '#e01919',
  ByRequestOnly: '#227dff',
  PublicNetwork: '#1dcfbb',
}

export const sectionLevels = {
  Offline: 'Offline',
  PrivateNetworkOnly: 'Private',
  ByRequestOnly: 'By Request',
  PublicNetwork: 'Public',
}

export const PASSWORD_REQUIRMENTS = [
  'contain at least 8 character',
  'contain at least 1 uppercase letter',
  'contain at least 1 lowercase letter',
  'contain at least 1 special symbol',
  'contain at least 1 digit',
]

export const defaultChannel = {
  name: 'Home',
  orderIndex: 0,
  instanceStatus: 'Included',
}

export const typeLabels = {
  OperatingSector: 'Current Sectors',
  OperatingMarket: 'Current Markets',
  DesiredObjective: 'Strategic Objectives',
  DesiredSector: 'Desired Sector',
  DesiredMarket: 'Desired Market',
  Keyword: 'Keyword',
}

export const memberRoles = [
  { label: 'Owner', value: 'Owner' },
  { label: 'Collaborator', value: 'Collaborator' },
  { label: 'Channel Subscriber', value: 'ChannelSubscriber' },
]

export const typesOptions = [
  { label: 'Text', value: TEXT },
  { label: 'Phone', value: PHONE },
  { label: 'Url', value: URL },
  { label: 'Number', value: NUMBER },
  { label: 'Selection List', value: SELECT },
]

export const searchToggleButtons = [
  {
    name: 'wizzard',
    title: 'Wizard',
  },
  {
    name: 'traditional',
    title: 'Traditional',
  },
]

// definitionType
export const RELATIONSHIP_CUSTOM_FIELD = 'RelationshipCustomField'
export const RELATIONSHIP_TYPE = 'RelationshipType'
export const RELATIONSHIP_SOURCE = 'RelationshipSource'
export const RELATIONSHIP_STANDARD_TAG = 'RelationshipStandardTag'
export const RELETIONSHIP_SMART_TAG = 'ReletionshipSmartTag'

// connectionStatus
export const NONE = 'None'
export const CONNECTED = 'Connected'
export const CONNECTION_PENDING = 'ConnectionPending'
export const CONNECTION_REJECTED = 'ConnectionRejected'
export const DISCONNECTED = 'Disconnected'
export const FOLLOWING = 'Following'
export const SUGGESTED = 'Suggested'

// memberRole
export const OWNER = 'Owner'

export const subscriptionLabel = {
  ExpandigoBasic: 'Expandigo Basic',
  ExpandigoPartner: 'Expandigo Partner',
  ExpandigoPortal: 'Expandigo Portal',
  ExpandigoUnlimited: 'Expandigo Unlimited',
}

export const EXPANDIGO_BASIC = 'ExpandigoBasic'

//sourceTypes
export const sourceTypeLabels = {
  Inbound: 'Inbound',
  Import: 'Import',
  ManualEntry: 'Manual Entry',
}
