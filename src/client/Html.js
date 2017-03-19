/** Main entrypoint for serverside rendered app.
 *  This is where you would go about putting analytics for the webapp,
 *  and global config that is needed for your web application
 *  */

import React, { PropTypes } from 'react';

const { string, arrayOf, shape } = PropTypes;

class Html extends React.Component {
  static propTypes = {
    title: string.isRequired,
    description: string.isRequired,
    styles: arrayOf(shape({
      id: string.isRequired,
      cssText: string.isRequired,
    }).isRequired),
    scripts: arrayOf(string.isRequired),
    children: string.isRequired,
  };

  static defaultProps = {
    styles: [],
    scripts: [],
  };

  render() {
    const {
      title,
      description,
      styles,
      scripts,
      children,
    } = this.props;

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {styles.map(style =>
            <style
              key={style.id}
              id={style.id}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />,
          )}
        </head>
        <body>
          <div
            id="app"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: children }}
          />
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
