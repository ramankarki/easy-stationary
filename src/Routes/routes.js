import {
  ROOT,
  SIGNUP,
  ALL_PRODUCTS,
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
} from './contants';
import LazyLoadPages from './LazyLoadPages';

// Add Routes here
const routes = {
  [ROOT]: {
    private: false,
    component: LazyLoadPages.Landing,
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

  [ALL_PRODUCTS]: {
    private: false,
    component: LazyLoadPages.AllProducts,
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

  [PAGE_NOT_FOUND]: {
    private: false,
    component: LazyLoadPages.PageNotFound,
  },
};

export default routes;
