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
    private: true,
  },
  {
    value: 'Orders',
    path: DASHBOARD_ORDERS,
    iconsrc: '/assets/order icon.svg',
    private: true,
  },
  {
    value: 'My reviews',
    path: DASHBOARD_MY_REVIEWS,
    iconsrc: '/assets/my reviews.svg',
    private: true,
  },
  {
    value: 'My wishlists',
    path: DASHBOARD_MY_WISHLISTS,
    iconsrc: '/assets/my wishlists.svg',
    private: true,
  },
  {
    value: 'Settings',
    path: DASHBOARD_SETTINGS,
    iconsrc: '/assets/settings icon.svg',
    private: true,
  },
];

export default aside;
