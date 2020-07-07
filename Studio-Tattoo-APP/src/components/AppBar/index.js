import React from 'react';
import { DefaultTheme, Appbar, Provider } from 'react-native-paper';
import { StyleSheet, Alert } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
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
      "Sobre!",
      "Este aplicativo foi desenvolvido por Moisés Lemos." +
      "\n\nE-mail: Moises_lemos@outlook.com" +
      "\nGithub: MoisesLemos-code" +
      "\nVersão: 1.1.0 - 05/07/2020",
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
        icon: props => <FontAwesome5 {...props}
          style={{ color: '#FFF' }} />,
      }}>
      <Appbar style={styles.appBar}>
        <Appbar.Action
          icon="bars"
          onPress={() => props.drawer()}
        />
        <Appbar.Content title="Tattoo Studio" titleStyle={{ color: '#FFF', textAlign: 'center' }} />
        <Appbar.Action icon="ellipsis-v" onPress={() => informacoes()} />
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