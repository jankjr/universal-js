
import queryString from 'query-string';
import { AppRegistry } from 'react-native'; // eslint-disable-line
import UniversalRouter from 'universal-router';
import App from './src/client/Web';
import routes from './src/client/routes';

async function init() {
  const container = document.getElementById('app');
  // Initial resolve
  const route = await UniversalRouter.resolve(routes, {
    path: location.pathname,
    query: queryString.parse(location.search),
  });

  AppRegistry.registerComponent('App', App);
  AppRegistry.runApplication('App', {
    route,
    initialProps: {},
    rootTag: container,
  });
}

// Main entry point
init(routes);
