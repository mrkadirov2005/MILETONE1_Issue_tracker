/**
 * API Configuration Constants
 */

const PORT = 5000;
export const DEFAULT_ENDPOINT = `http://localhost:${PORT}`;

export const API_ROUTES = {
  // Auth endpoints
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    VERIFY: '/token/verify',
  },
  // Issue endpoints
  ISSUE: {
    CREATE: '/issue/add',
    GET_ALL: '/issue/all',
    GET_BY_ID: '/issue/by_id',
    UPDATE: '/issue/update',
    DELETE: '/issue/delete',
  },
  // Label endpoints
  LABEL: {
    CREATE: '/label/add',
    GET_ALL: '/label/all',
    UPDATE: '/label/update',
    DELETE: '/label/delete',
    ASSIGN: '/label/add',
  },
  // Comment endpoints
  COMMENT: {
    CREATE: '/comment/add',
    GET_ISSUE_COMMENTS: '/comment/issue',
    GET_USER_COMMENTS: '/comment/user',
    UPDATE: '/comment/update',
    DELETE: '/comment/delete',
  },
};

// Token storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_ID: 'userId',
  USER_EMAIL: 'userEmail',
};

// Query cache times (in milliseconds)
export const CACHE_TIMES = {
  ISSUES: 5 * 60 * 1000, // 5 minutes
  LABELS: 10 * 60 * 1000, // 10 minutes
  COMMENTS: 3 * 60 * 1000, // 3 minutes
  USER: 15 * 60 * 1000, // 15 minutes
};
