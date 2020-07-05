import React from 'react';
import { DefaultTheme, Appbar, Provider } from 'react-native-paper';
import { StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AppBar(props) {

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
  };

  function informacoes() {
    Alert.alert(
      "Informação!",
      "Este aplicativo foi desenvolvido por Moisés Lemos." +
      "\n\nE-mail: Moises_lemos@outlook.com",
      [
        { text: "OK" }
      ],
      { cancelable: false }
    )
  }

  return (
    <Provider
      theme={theme}
      settings={{
        icon: props => <MaterialCommunityIcons {...props}
          style={{ color: '#FFF' }} />,
      }}>
      <Appbar style={styles.appBar}>
        <Appbar.Action
          icon="menu"
          onPress={() => props.drawer()}
        />
        <Appbar.Content title="Tattoo Studio" titleStyle={{ color: '#FFF', textAlign: 'center' }} />
        <Appbar.Action icon="dots-vertical-circle-outline" onPress={() => informacoes()} />
      </Appbar>
    </Provider >
  )
}

const styles = StyleSheet.create({
  appBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 25,
  },
});