import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppBar from '../../components/AppBar'
import TabNavigator from './tabNavigator'

export default function Sessao({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <AppBar drawer={() => navigation.toggleDrawer()} />
      </View>
      <TabNavigator />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  subContainer: {
    backgroundColor: '#121212',
    height: 80
  }
});
