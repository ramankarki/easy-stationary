import { Route, HashRouter, Switch, Redirect } from 'react-router-dom';

import { injectReducer } from '../utils/dynamicReducers';
import HOFreducer from '../reducers/HOFreducer';
import { LOGIN } from './contants';
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
    let component = wrapper(
      parsedUser?.expiryDate,
      routes[path].private,
      routes[path].component
    );

    allTheRoutes.push(
      <Route key={path} path={path} exact component={component} />
    );
  }

  return (
    <HashRouter>
      <Switch>{allTheRoutes}</Switch>
    </HashRouter>
  );
}

function wrapper(expiryDate, privateRoute, component) {
  if (privateRoute) {
    if (Date.now() < expiryDate) return component;
    return <Redirect to={LOGIN} />;
  }
  return component;
}
