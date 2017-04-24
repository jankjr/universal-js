/** @flow */
import React from 'react';
import routes from './src/client/routes';
import UniversalRouter from 'universal-router';
import { AppRegistry } from 'react-native';
import Native from './src/client/Native';

async function init() {
  // Initial resolve
  const route = await UniversalRouter.resolve(routes, {
    path: '/', // Resume from memory?
  });

  AppRegistry.registerComponent('aarhusReact', () => () => <Native route={route} />);
}

// Main entry point
init(routes);
