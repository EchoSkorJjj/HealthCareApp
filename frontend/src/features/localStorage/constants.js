/**
 * Constants relating to localStorage.
 */

/**
 * Key to store whether the admin is logged in in localStorage.
 */
export const LOGGED_IN_KEY = 'is-logged-in'

export const GOOGLE_AUTH_KEY = 'is-google-authenticated';

export const GITHUB_AUTH_KEY = 'is-github-authenticated';
/**
 * Event name to be used when emitting event to indicate that localStorage has
 * been modified.
 */
export const LOCAL_STORAGE_EVENT = 'local-storage'