import React from 'react';
import { View, Text } from 'react-native';
import Link from '../../components/link';

export const Home = () => (
  <View>
    <Text> Hello react native </Text>
    <Link to="/about"> Goto about page </Link>
  </View>
);

export default Home;
