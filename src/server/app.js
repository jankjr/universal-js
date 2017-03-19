/** Main entrypoint for the server */

import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import UniversalRouter from 'universal-router';
import PrettyError from 'pretty-error';
import { AppRegistry } from 'react-native-web';

import routes from '../client/routes';
import Html from '../client/Html';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import { port } from '../config';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const route = await UniversalRouter.resolve(routes, {
      path: req.path,
      query: req.query,

      /*
       * for service-side prefetching of resources during routing.
       *

      fetch: (url, opts={}) => fetch(url, {
        ... opts,
        headers: {
          ... opts.headers,
          cookie: req.headers.cookie
        }
      }) */
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    AppRegistry.registerComponent('App', () => (() => route.component));
    const { element, stylesheet } = AppRegistry.getApplication('App', { });

    data.children = ReactDOMServer.renderToString(element);

    data.styles = [
      { id: 'css', cssText: stylesheet },
    ];

    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];

    if (assets[route.chunk]) {
      data.scripts.push(assets[route.chunk].js);
    }


    const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
    >
      <div>
        <h1> (Very) Unexpected server error </h1>
      </div>
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`The server is running at http://localhost:${port}/`);
});

