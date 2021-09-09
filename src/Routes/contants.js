// Add Routes contants here
export const ROOT = '/';
export const LANDING_PAGE = '/landing-page';
export const SIGNUP = '/auth/signup';
export const LOGIN = '/auth/login';
export const ACTIVATE_ACCOUNT = '/auth/activate-account';
export const FORGOT_PASSWORD = '/auth/forgot-password';
export const RESET_PASSWORD = '/auth/reset-password';
export const SINGLE_PRODUCT = '/:categoryName/:productId';
export const SINGLE_CATEGORY_PRODUCTS = '/:categoryName';
export const SEARCH = '/search';

// admin routes start
export const ADMIN = '/admin';
export const ADMIN_CATEGORY = '/admin/category';
export const ADMIN_ADD_NEW_PRODUCT = '/admin/add-new-product';
export const ADMIN_ORDERS = '/admin/orders';
export const ADMIN_SETTINGS = '/admin/settings';
// admin routes end

// user routes start
export const CART = '/cart';
export const DASHBOARD = '/dashboard';
// user routes end

export const PAGE_NOT_FOUND = '*';
