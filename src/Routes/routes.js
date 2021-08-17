import { ROOT, SIGNUP, ALL_PRODUCTS, PAGE_NOT_FOUND } from './contants';
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

  [ALL_PRODUCTS]: {
    private: false,
    component: LazyLoadPages.AllProducts,
  },

  [PAGE_NOT_FOUND]: {
    private: false,
    component: LazyLoadPages.PageNotFound,
  },
};

export default routes;
