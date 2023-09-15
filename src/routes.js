/* eslint-disable import/no-anonymous-default-export */
export const companyBase = '/company'

export default {
  home: '/',

  // auth
  signIn: '/sign-in',

  // Unauthenticated search resluts
  searchResults: '/search-results',

  // user
  userProfile: '/user/profile',
  userSecurity: '/user/security',
  userProfileEdit: '/user/profile/edit',
  userPreferences: '/user/preferences',

  // company routes
  createCompany: '/create-company',
  company: '/company/[companyId]',
  companySubscription: '/company/[companyId]/current-plan',
  companyChannel: '/company/[companyId]/channel/[channelId]',
  companyProfile: '/company/[companyId]/profile',
  companySetup: '/company/[companyId]/setup',
  companyMembers: '/company/[companyId]/members',
  companyMember: '/company/[companyId]/members/[memberId]',
  companyMemberEdit: '/company/[companyId]/members/[memberId]/edit',
  companyAnalytics: '/company/[companyId]/analytics',
  companyPages: '/company/[companyId]/page/[pageId]',
  companyAssistedResearch: '/company/[companyId]/assisted-research',
  companyRelationships: '/company/[companyId]/relationships',
  companyRelationship: '/company/[companyId]/relationships/[relationshipId]',
}
