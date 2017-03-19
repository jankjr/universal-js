import React, { PropTypes } from 'react';
import history from '../../../history';
import { Text, Platform } from 'react-native';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
    to: null,
  };

  handlePress = () => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
    history.push(this.props.to);
  };

  handleClick = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(this.props.to);
  };

  render() {
    const { to, children, ...props } = this.props;
    if (!to) {
      return React.Children.only(this.props.children);
    }
    return Platform.select({
      ios: <Text onPress={this.handlePress}>{children}</Text>,  // React-native
      android: <Text onPress={this.handlePress}>{children}</Text>,  // React-native
      web: <a href={to} {...props} onClick={this.handleClick}>{children}</a>, // Web/Node
    });
  }
}

export default Link;
