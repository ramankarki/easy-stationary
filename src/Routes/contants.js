// Add Routes contants here
export const ROOT = '/';
export const LANDING_PAGE = '/landing-page';
export const ABOUT_US_PAGE = '/about-us';
export const TERMS_AND_CONDITIONS_PAGE = '/terms-and-conditions';
export const POLICY_PAGE = '/policy';
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
export const DASHBOARD_ORDERS = '/dashboard/orders';
export const DASHBOARD_MY_REVIEWS = '/dashboard/my-reviews';
export const DASHBOARD_MY_WISHLISTS = '/dashboard/my-wishlists';
export const DASHBOARD_SETTINGS = '/dashboard/settings';
// user routes end

export const PAGE_NOT_FOUND = '*';
