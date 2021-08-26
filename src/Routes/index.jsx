import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';

import { injectReducer } from '../utils/dynamicReducers';
import HOFreducer from '../reducers/HOFreducer';
import { LOGIN, ALL_PRODUCTS } from './contants';
import routes from './routes';

const USER = localStorage.getItem('USER');
let parsedUser;
if (USER) {
  parsedUser = JSON.parse(USER);
  injectReducer('USER', HOFreducer('USER', parsedUser));
}
export default function RoutesGenerator() {
  const allTheRoutes = [];

  for (let path in routes) {
    let page = wrapper(
      parsedUser,
      routes[path].private,
      routes[path].role,
      routes[path].component
    );

    allTheRoutes.push(<Route key={path} path={path} exact component={page} />);
  }

  return (
    <HashRouter>
      <Switch>{allTheRoutes}</Switch>
    </HashRouter>
  );
}

function wrapper(parsedUser, privateRoute, role, page) {
  // if page is accessible by user type.
  if (!role.includes(parsedUser?.user.role))
    return <Redirect to={ALL_PRODUCTS} />;

  // check if this page needs authentication.
  if (privateRoute) {
    // check if token is expired.
    if (Date.now() < parsedUser?.expiryDate) return page;
    return <Redirect to={LOGIN} />;
  }
  return page;
}
