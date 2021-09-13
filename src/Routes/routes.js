import {
  ROOT,
  SIGNUP,
  LANDING_PAGE,
  PAGE_NOT_FOUND,
  LOGIN,
  ACTIVATE_ACCOUNT,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  ADMIN,
  CART,
  DASHBOARD,
  ADMIN_CATEGORY,
  ADMIN_SETTINGS,
  ADMIN_ADD_NEW_PRODUCT,
  SINGLE_PRODUCT,
  SINGLE_CATEGORY_PRODUCTS,
  SEARCH,
  DASHBOARD_ORDERS,
} from './contants';
import LazyLoadPages from './LazyLoadPages';

// Add Routes here
const routes = {
  [ROOT]: {
    private: false,
    component: LazyLoadPages.AllProducts,
  },

  [SIGNUP]: {
    private: false,
    component: LazyLoadPages.Signup,
  },

  [LOGIN]: {
    private: false,
    component: LazyLoadPages.Login,
  },

  [ACTIVATE_ACCOUNT]: {
    private: false,
    component: LazyLoadPages.ActivateAccount,
  },

  [FORGOT_PASSWORD]: {
    private: false,
    component: LazyLoadPages.ForgotPassword,
  },

  [RESET_PASSWORD]: {
    private: false,
    component: LazyLoadPages.ResetPassword,
  },

  [LANDING_PAGE]: {
    private: false,
    component: LazyLoadPages.Landing,
  },

  [ADMIN]: {
    private: true,
    component: LazyLoadPages.Admin,
    role: ['admin'],
  },

  [ADMIN_CATEGORY]: {
    private: true,
    component: LazyLoadPages.AdminCategory,
    role: ['admin'],
  },

  [ADMIN_SETTINGS]: {
    private: true,
    component: LazyLoadPages.AdminSettings,
    role: ['admin'],
  },

  [ADMIN_ADD_NEW_PRODUCT]: {
    private: true,
    component: LazyLoadPages.AdminAddNewProduct,
    role: ['admin'],
  },

  [CART]: {
    private: true,
    component: LazyLoadPages.Cart,
    role: ['client'],
  },

  [DASHBOARD]: {
    private: true,
    component: LazyLoadPages.Dashboard,
    role: ['client'],
  },

  [DASHBOARD_ORDERS]: {
    private: true,
    component: LazyLoadPages.DashboardOrders,
    role: ['client'],
  },

  [SEARCH]: {
    private: false,
    component: LazyLoadPages.Search,
  },

  [SINGLE_PRODUCT]: {
    private: false,
    component: LazyLoadPages.SingleProduct,
  },

  [SINGLE_CATEGORY_PRODUCTS]: {
    private: false,
    component: LazyLoadPages.SingleCategoryProducts,
  },

  [PAGE_NOT_FOUND]: {
    private: false,
    component: LazyLoadPages.PageNotFound,
  },
};

export default routes;
