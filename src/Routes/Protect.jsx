import { Redirect } from 'react-router-dom';

import { injectReducer } from '../utils/dynamicReducers';
import { LOGIN } from './contants';

function Protect(props) {
  const USER = localStorage.getItem('USER');
  if (USER) {
    const parsedUser = JSON.parse(USER);
    injectReducer('USER', parsedUser);
    if (Date.now() < parsedUser.expiryDate) return props.component;
  }
  return <Redirect to={LOGIN} />;
}

export default Protect;
