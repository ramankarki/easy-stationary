import { Route, HashRouter, Switch } from 'react-router-dom';
import routes from './routes';

export default function RoutesGenerator() {
  const allTheRoutes = [];

  for (let path in routes) {
    allTheRoutes.push(
      <Route path={path} exact component={routes[path].component} key={path} />
    );
  }

  return (
    <HashRouter>
      <Switch>{allTheRoutes}</Switch>
    </HashRouter>
  );
}
