import { Route, HashRouter, Switch } from 'react-router-dom';

import routes from './routes';

import Protect from './Protect';

export default function RoutesGenerator() {
  const allTheRoutes = [];

  for (let path in routes) {
    const route = (
      <Route path={path} exact component={routes[path].component} key={path} />
    );

    if (routes[path].private) {
      allTheRoutes.push(<Protect component={route} />);
    }
    allTheRoutes.push(route);
  }

  return (
    <HashRouter>
      <Switch>{allTheRoutes}</Switch>
    </HashRouter>
  );
}
