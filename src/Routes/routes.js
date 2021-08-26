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
} from './contants';
import LazyLoadPages from './LazyLoadPages';

// Add Routes here
const routes = {
  [ROOT]: {
    private: false,
    component: LazyLoadPages.Landing,
    role: ['client', 'admin'],
  },

  [SIGNUP]: {
    private: false,
    component: LazyLoadPages.Signup,
    role: ['client'],
  },

  [LOGIN]: {
    private: false,
    component: LazyLoadPages.Login,
    role: ['client', 'admin'],
  },

  [ACTIVATE_ACCOUNT]: {
    private: false,
    component: LazyLoadPages.ActivateAccount,
    role: ['client'],
  },

  [FORGOT_PASSWORD]: {
    private: false,
    component: LazyLoadPages.ForgotPassword,
    role: ['client', 'admin'],
  },

  [RESET_PASSWORD]: {
    private: false,
    component: LazyLoadPages.ResetPassword,
    role: ['client', 'admin'],
  },

  [ALL_PRODUCTS]: {
    private: false,
    component: LazyLoadPages.AllProducts,
    role: ['client', 'admin'],
  },

  [ADMIN]: {
    private: true,
    component: LazyLoadPages.Admin,
    role: ['admin'],
  },

  [PAGE_NOT_FOUND]: {
    private: false,
    component: LazyLoadPages.PageNotFound,
    role: ['client', 'admin'],
  },
};

export default routes;
