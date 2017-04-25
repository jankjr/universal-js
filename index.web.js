/** @flow */
import React from 'react';
import { AppRegistry } from 'react-native'; // eslint-disable-line
import queryString from 'query-string';
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

  AppRegistry.registerComponent('reactAarhus', () => () => React.createElement(App, { route }));
  AppRegistry.runApplication('reactAarhus', { rootTag: container });
}

// Main entry point
init(routes);
