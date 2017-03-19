/**
 * Defines the web main 'app' point
 */

import React, { PropTypes } from 'react';
import queryString from 'query-string';
import UniversalRouter from 'universal-router';
import history from '../history';

function updateTag(tagName, keyName, keyValue, attrName, attrValue) {
  const node = document.head.querySelector(`${tagName}[${keyName}="${keyValue}"]`);
  if (node && node.getAttribute(attrName) === attrValue) return;

  // Remove and create a new tag in order to make it work with bookmarks in Safari
  if (node) {
    node.parentNode.removeChild(node);
  }
  if (typeof attrValue === 'string') {
    const nextNode = document.createElement(tagName);
    nextNode.setAttribute(keyName, keyValue);
    nextNode.setAttribute(attrName, attrValue);
    document.head.appendChild(nextNode);
  }
}

const scrollPositionsHistory = {};
if (window.history && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

let currentLocation;
class App extends React.PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,  // eslint-disable-line
  };

  constructor(props) {
    super(props);

    currentLocation = history.location;
    this.state = {
      route: props.route,
    };
  }

  componentDidMount() {
    history.listen((location, action) => this.onLocationChange(location, action));
  }

  async onLocationChange(location, action) {
    const { routes } = this.props;

    // Remember the latest scroll position for the previous location
    scrollPositionsHistory[currentLocation.key] = {
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
    };

    // Delete stored scroll position for next page if any
    if (action === 'PUSH') {
      delete scrollPositionsHistory[location.key];
    }

    currentLocation = location;

    try {
      // Traverses the list of routes in the order they are defined until
      // it finds the first route that matches provided URL path string
      // and whose action method returns anything other than `undefined`.
      const route = await UniversalRouter.resolve(routes, {
        path: location.pathname,
        query: queryString.parse(location.search),
      });

      // Prevent multiple page renders during the routing process
      if (currentLocation.key !== location.key) {
        return;
      }

      if (route.redirect) {
        history.replace(route.redirect);
        return;
      }

      setTimeout(() => this.setState({
        route,
      }), 0);

      updateTag('meta', 'name', 'description', 'content', route.description || route.title);
      window.document.title = route.title;
    } catch (error) {
      if (__DEV__) {
        // Dev mode, kill off the rendering
        window.postMessage('error', error);
      } else if (action && currentLocation.key === location.key) {
        window.location.reload();
      }
    }
  }

  render() {
    const { component, ...props } = this.state.route;
    return React.cloneElement(component, props);
  }
}

export default App;
