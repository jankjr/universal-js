
import React from 'react';
import ErrorReporter from 'redbox-react';
import queryString from 'query-string';
import { AppRegistry } from 'react-native'; // eslint-disable-line
import FastClick from 'fastclick';
import UniversalRouter from 'universal-router';
import App from './src/client/Web';

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);

let appInstance;
let routes = require('./src/client/routes').default;

async function init(initializedRoutes) {
  const container = document.getElementById('app');
  // Handle HMR
  if (__DEV__ && appInstance) {
    AppRegistry.unmountApplicationComponentAtRootTag(container);
  }

  // Initial resolve
  const route = await UniversalRouter.resolve(routes, {
    path: location.pathname,
    query: queryString.parse(location.search),
  });

  AppRegistry.registerComponent('App', () => (() => React.createElement(App, { route, routes: initializedRoutes })));
  AppRegistry.runApplication('App', {
    initialProps: {},
    rootTag: container,
  });

  appInstance = true;
}

// Main entry point
init(routes);

// Handle errors that might happen after rendering
// Display the error in full-screen for development mode
if (__DEV__) {
  window.addEventListener('error', (event) => {
    const container = document.getElementById('app');

    document.title = `Runtime Error: ${event.error.message}`;
    appInstance = null;
    AppRegistry.unmountApplicationComponentAtRootTag(container);

    AppRegistry.registerComponent('Error', () => (() => React.createElement(ErrorReporter, { error: event.error })));
    AppRegistry.runApplication('Error', {
      initialProps: {},
      rootTag: container,
    });
  });

  // Enable Hot Module Replacement (HMR)
  if (module.hot) {
    module.hot.accept('./src/client/routes', async () => {
      routes = require('./src/client/routes').default; // eslint-disable-line global-require
      init(routes);
    });
  }
}

