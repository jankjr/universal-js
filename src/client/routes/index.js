/** Toplevel application router */

import home from './home';
import about from './about';

export default {
  path: '/',

  async action({ next }) {
    const route = await next();
    return route;
  },

  children: [
    home,
    about,
  ],
};
