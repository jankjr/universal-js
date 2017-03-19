import React from 'react';
import AboutView from './About';

export default {
  path: '/About',
  action: () => ({
    title: 'About page',
    description: 'This is the about page, it contains portraits of the founders',
    component: <AboutView />,
  }),
};
