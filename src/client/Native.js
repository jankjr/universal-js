/**
 * Defines the web main 'app' point
 */

import React, { PropTypes } from 'react';
import queryString from 'query-string';
import UniversalRouter from 'universal-router';
import history from '../history';

const { arrayOf, object } = PropTypes;

let currentLocation;
class NativeApp extends React.PureComponent {
  static propTypes = {
    routes: arrayOf(
      object,
    ).isRequired,
  };

  constructor(props) {
    super(props);

    currentLocation = history.location;
    this.state = {
      route: null,
    };

    this.onLocationChange(history.location);
  }

  componentDidMount() {
    history.listen((location, action) => this.onLocationChange(location, action));
  }

  async onLocationChange(location) {
    const { routes } = this.props;
    currentLocation = location;

    try {
      const route = await UniversalRouter.resolve(routes, {
        path: location.pathname,
        query: queryString.parse(location.search),
      });

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
    } catch (error) {
      throw error;
    }
  }

  render() {
    if (!this.state.route) {
      return null;
    }

    const { component, ...props } = this.state.route;
    return React.cloneElement(component, props);
  }
}

export default NativeApp;
