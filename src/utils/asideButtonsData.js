import {
  ADMIN,
  ADMIN_CATEGORY,
  ADMIN_ADD_NEW_PRODUCT,
  ADMIN_ORDERS,
  ADMIN_SETTINGS,
} from '../Routes/contants';

const aside = [
  {
    value: 'Dashboard',
    path: ADMIN,
    iconsrc: '/assets/overview icon.svg',
  },
  {
    value: 'Category',
    path: ADMIN_CATEGORY,
    iconsrc: '/assets/category icon.svg',
  },
  {
    value: 'Add new product',
    path: ADMIN_ADD_NEW_PRODUCT,
    iconsrc: '/assets/add product icon.svg',
  },
  {
    value: 'Orders',
    path: ADMIN_ORDERS,
    iconsrc: '/assets/order icon.svg',
  },
  {
    value: 'Settings',
    path: ADMIN_SETTINGS,
    iconsrc: '/assets/settings icon.svg',
  },
];

const getAside = (...args) => aside.filter(({ value }) => args.includes(value));

export default getAside;
