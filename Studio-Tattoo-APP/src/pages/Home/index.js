import React, { useState } from 'react';
import {
  View, Text, StyleSheet
} from 'react-native'

import AppBar from '../../components/AppBar'


export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <AppBar drawer={() => navigation.toggleDrawer()} />
      <Text>Teste</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  }
});