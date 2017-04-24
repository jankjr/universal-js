/**
 * Defines the web main 'app' point
 */

import React, { PropTypes } from 'react';
import queryString from 'query-string';
import UniversalRouter from 'universal-router';
import history from '../history';
import routes from './routes';

let currentLocation;
class NativeApp extends React.PureComponent {
  static propTypes = {
    route: PropTypes.object.isRequired,  // eslint-disable-line
  };

  constructor(props) {
    super(props);

    currentLocation = history.location;
    this.state = {
      route: props.route,
    };

    this.onLocationChange(history.location);
  }

  componentDidMount() {
    history.listen((location, action) => this.onLocationChange(location, action));
  }

  async onLocationChange(location) {
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
    const { component, ...props } = this.state.route;
    return React.cloneElement(component, props);
  }
}

export default NativeApp;
