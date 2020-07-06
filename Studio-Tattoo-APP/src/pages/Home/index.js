import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image
} from 'react-native'

import AppBar from '../../components/AppBar'

import maquinaTatuar from '../../img/maquina_tatuar.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <View style={styles.appBar}>
        <AppBar drawer={() => navigation.toggleDrawer()} />
      </View>
      <View style={styles.containerBox}>
        <Text style={styles.text}>Navegar</Text>
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
            onPress={() => navigation.navigate("Cliente")}
          >
            <Image source={maquinaTatuar} />
            <Text style={styles.textBtn}>Iniciar Sessão</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center'
  },
  appBar: {
    height: 80,
    backgroundColor: '#121212'
  },
  containerBox: {
    flex: 1,
    marginTop: 50,
    alignItems: 'center',
  },
  line: {
    marginTop: 20,
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
    textAlign: 'center',
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