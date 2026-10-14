export const ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  ME: '/auth/me',
  
  // Organizations
  ORGANIZATIONS: '/organization',
  ORGANIZATION_DETAIL: (id) => `/organization/${id}`,
  ORGANIZATION_MEMBERS: (id) => `/organization/${id}/members`,
  SWITCH_ORGANIZATION: (id) => `/organization/${id}/switch`,

  //MEMBERS
  MEMBERS: '/member',

  // Finance
  TRANSACTION: '/finance/transaction',
  ACCOUNT: '/finance/account',
  SUMMARY: '/finance/summary',
  REPORT: '/finance/reports',
  CATEGORY_BREAKDOWN: '/finance/category/breakdown',
  MEMBER_BREAKDOWN: '/member/breakdown',
  CATEGORY: '/finance/category',
  EXPORT: '/finance/export',

  // Tasks
  TASKS: '/tasks',

  // Profile
  PROFILE: '/user',
  CHANGE_PASSWORD: '/user/change-password',

  // Roadmaps
  ROADMAPS: '/roadmaps',
  ROADMAP_NOTES: '/roadmap-notes',

  //MILESTONE
  MILESTONE: '/milestone',

  // Notifications
  NOTIFICATIONS: '/notification', 

};