import {
  DASHBOARD,
  DASHBOARD_MY_REVIEWS,
  DASHBOARD_MY_WISHLISTS,
  DASHBOARD_ORDERS,
  DASHBOARD_SETTINGS,
} from '../../Routes/contants';

const aside = [
  {
    value: 'Dashboard',
    path: DASHBOARD,
    iconsrc: '/assets/overview icon.svg',
  },
  {
    value: 'Orders',
    path: DASHBOARD_ORDERS,
    iconsrc: '/assets/order icon.svg',
  },
  {
    value: 'My reviews',
    path: DASHBOARD_MY_REVIEWS,
    iconsrc: '/assets/my reviews.svg',
  },
  {
    value: 'My wishlists',
    path: DASHBOARD_MY_WISHLISTS,
    iconsrc: '/assets/my wishlists.svg',
  },
  {
    value: 'Settings',
    path: DASHBOARD_SETTINGS,
    iconsrc: '/assets/settings icon.svg',
  },
];

export default aside;
