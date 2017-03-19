import React from 'react';
import { View, ActivityIndicator, Button, Text, Switch } from 'react-native';
import Link from '../../components/link';

export const Home = () => (
  <View>
    <Text> This is home </Text>
    <Switch />
    <ActivityIndicator />
    <Button title="foo" onPress={console.log}/>
    <Link to="/about"> Goto about page </Link>
  </View>
);

export default Home;
