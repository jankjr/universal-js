import React from 'react';
import HomeView from './Home';

export default {
  path: '/',
  action: () => ({
    title: 'Home',
    description: 'First page',
    component: <HomeView />,
  }),
};
