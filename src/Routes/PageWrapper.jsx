import { Redirect } from 'react-router-dom';

import { injectReducer, ejectReducer } from '../utils/dynamicReducers';
import HOFreducer from '../reducers/HOFreducer';
import { LOGIN, ALL_PRODUCTS } from './contants';

function Wrapper(props) {
  const { route } = props;
  const { private: privateRoute, role, component } = route;

  const USER = localStorage.getItem('USER');
  let user;
  if (USER) {
    user = JSON.parse(USER);
    ejectReducer('USER');
    injectReducer('USER', HOFreducer('USER', user));
  }

  // check if this page needs authentication.
  if (privateRoute) {
    // check if token is expired.
    if (!user || Date.now() > +user.expiryDate) return <Redirect to={LOGIN} />;

    // if page is accessible by user type.
    if (!role.includes(user.user.role)) return <Redirect to={ALL_PRODUCTS} />;
  }

  return component;
}

export default Wrapper;
