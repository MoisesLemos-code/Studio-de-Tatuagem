import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView
} from 'react-native'

import AppBar from '../../components/AppBar'

import maquinaTatuar from '../../img/maquina_tatuar.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ListSessao from '../../components/ListSessao/listPage'

export default function Home({ navigation }) {

  const header = () => {
    return (
      <View style={styles.containerBoxHeader}>
        <View style={styles.containerBoxItem}>
          <Text style={styles.text}>Navegar</Text>
          <View style={styles.line}></View>
          <View style={styles.containerBtn}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Cliente")}
            >
              <MaterialCommunityIcons name={'account-plus'} size={40} color={'#FFF'} />
              <Text style={styles.textBtn}>Cadastro de Cliente</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Sessao")}
            >
              <Image source={maquinaTatuar} />
              <Text style={styles.textBtn}>Iniciar Sessão</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.containerBoxItem}>
          <Text style={styles.text}>Últimas Sessões</Text>
          <View style={styles.line}></View>
        </View>
      </View>
    )
  }

  const footer = () => {
    return (
      <View style={styles.containerBoxFooter}></View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <AppBar drawer={() => navigation.toggleDrawer()} />
      </View>
      <ListSessao header={() => header()} footer={() => footer()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1
  },
  appBar: {
    height: 80,
    backgroundColor: '#121212'
  },
  containerBoxHeader: {
    marginTop: 10,
    marginBottom: 10
  },
  containerBoxFooter: {
    marginTop: 10,
    marginBottom: 10,
    height: 300,
  },
  containerBoxItem: {
    marginTop: 10,
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '95%',
    backgroundColor: "#CED0CE",
    opacity: 0.5
  },
  containerBtn: {
    marginTop: 10,
    flexDirection: 'row'
  },
  text: {
    color: '#fff',
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 30,
  },
  textBtn: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 15,
  },
  btn: {
    marginRight: 10,
    padding: 5,
    height: 100,
    width: 100,
    backgroundColor: '#3498db',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});