import React from 'react';
import { View, Text } from 'react-native';
import Link from '../../components/link';

export const About = () => (
  <View>
    <Text> About page </Text>
    <Link to="/"> Go back to home </Link>
  </View>
);

export default About;
