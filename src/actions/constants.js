/**
 * @description these state will be used in UI forms.
 */
export const UI_SIGNUP_STATE = 'UI_SIGNUP_STATE';
export const UI_LOGIN_STATE = 'UI_LOGIN_STATE';
export const UI_ACTIVATE_ACCOUNT_STATE = 'UI_ACTIVATE_ACCOUNT_STATE';
export const UI_FORGOT_PASSWORD_STATE = 'UI_FORGOT_PASSWORD_STATE';
export const UI_RESET_PASSWORD_STATE = 'UI_RESET_PASSWORD_STATE';
export const UI_USER_EMAIL_UPDATE_STATE = 'UI_USER_EMAIL_UPDATE_STATE';
export const UI_USER_PASSWORD_UPDATE_STATE = 'UI_USER_PASSWORD_UPDATE_STATE';
export const UI_SINGLE_PRODUCT_STATE = 'UI_SINGLE_PRODUCT_STATE';
export const UI_SEARCH_STATE = 'UI_SEARCH_STATE';
export const UI_ALL_PRODUCTS_STATE = 'UI_ALL_PRODUCTS_STATE';
export const UI_CATEGORY_STATE = 'UI_CATEGORY_STATE';

/**
 * @description these state will used to track data like ajax calls behind the seen.
 */
export const APP_SIGNUP_STATE = 'APP_SIGNUP_STATE';
export const APP_LOGIN_STATE = 'APP_LOGIN_STATE';
export const APP_ACTIVATE_ACCOUNT_STATE = 'APP_ACTIVATE_ACCOUNT_STATE';
export const APP_FORGOT_PASSWORD_STATE = 'APP_FORGOT_PASSWORD_STATE';
export const APP_RESET_PASSWORD_STATE = 'APP_RESET_PASSWORD_STATE';
export const APP_USER_STATE = 'APP_USER_STATE';
export const APP_USER_EMAIL_UPDATE_STATE = 'APP_USER_EMAIL_UPDATE_STATE';
export const APP_USER_PASSWORD_UPDATE_STATE = 'APP_USER_PASSWORD_UPDATE_STATE';
export const APP_SINGLE_PRODUCT_STATE = 'APP_SINGLE_PRODUCT_STATE';
export const APP_ALL_PRODUCTS_STATE = 'APP_ALL_PRODUCTS_STATE';
export const APP_SEARCH_STATE = 'APP_SEARCH_STATE';
export const APP_CATEGORY_STATE = 'APP_CATEGORY_STATE';

/**
 * @description Domain state operation type
 */
export const CREATE = '_CREATE';
export const READ = '_READ';
export const UPDATE = '_UPDATE';
export const DELETE = '_DELETE';

/**
 * @description data received from server will be stored here - static domain state
 */
export const USER = 'USER';
export const SINGLE_PRODUCT = 'SINGLE_PRODUCT';

/**
 * @description dynamic domain state
 */
export const CATEGORY = 'CATEGORY';

/**
 * @description miscellaneous, everything that doesn't in above states
 */
export const CRITICAL_MODAL_STATE = 'CRITICAL_MODAL_STATE';
