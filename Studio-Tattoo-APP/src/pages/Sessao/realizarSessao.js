import React, { useState } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert
} from 'react-native'
import { Avatar } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SearchCliente from './searchCliente'

import avatarImg from './../../img/avatar.png'

import api from "../../services/api"


export default function SessaoCadastro() {
  const [sessao, setSessao] = useState({
    status: "Aberto",
    total_acrescimo: 0.0,
    total_desconto: 0.0,
    total_liquido: 0.0,
    cliente_id: 0.0
  });

  const [cliente, setCliente] = useState({
    id: 0,
    nome: 'Selecione o cliente',
    endereco: '',
    email: '',
  })

  const [modal, setModal] = useState(false)

  // salvarSessao = async () => {
  //   try {
  //     if (sessao.nome === '' || sessao.endereco === '' || sessao.email === '') {
  //       Alert.alert(
  //         "Atenção!",
  //         "Preencha todos os campos!",
  //         [
  //           { text: "OK" }
  //         ],
  //         { cancelable: false }
  //       )
  //     } else {
  //       await api.post(`/sessao/insert`, user);
  //       Alert.alert(
  //         "Sucesso!",
  //         "Sessão realizada com sucesso!",
  //         [
  //           { text: "OK" }
  //         ],
  //         { cancelable: false }
  //       )
  //       setSessao({
  //         status: "Aberto",
  //         total_acrescimo: 0.0,
  //         total_desconto: 0.0,
  //         total_liquido: 0.0,
  //       })
  //     }
  //   }
  //   catch (err) {
  //     console.log(err)
  //     Alert.alert(
  //       "Falha!",
  //       "Não foi possível cadastrar!",
  //       [
  //         { text: "OK" }
  //       ],
  //       { cancelable: false }
  //     )
  //   }
  // }

  return (
    <View style={styles.container}>
      <View style={styles.bodyInputs}>
        <View style={styles.header}>
          <Avatar.Image source={avatarImg} size={150} style={styles.picture} />
          <View style={styles.headerBody}>
            <Text style={styles.textHead}>Cliente</Text>
            <SearchCliente
              modalHandle={modal}
              hideModal={() => setModal(false)}
              clienteSearch={(cliente) => setCliente(cliente)}
            />
            <TouchableOpacity
              style={styles.btnCliente}
              onPress={() => setModal(true)}
            >
              <Text style={styles.textInfo}>{cliente.nome}
              </Text>
              <MaterialCommunityIcons name={'account-search'} size={28} color={'#FFF'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.bodyButtons}>
        <TouchableOpacity
          style={styles.btn}
          // onPress={() => salvarSessao()}
          underlayColor='#fff'>
          <Text style={styles.btnText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
  },
  bodyInputs: {

  },
  header: {
    height: 300,
    backgroundColor: '#1E2125',
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  headerBody: {
    padding: 5,
  },
  picture: {
    marginTop: 10,
    alignSelf: 'center'
  },
  textHead: {
    fontSize: 15,
    color: '#D4D7DB'
  },
  textInfo: {
    fontSize: 20,
    color: '#FFFF',
  },
  btnCliente: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bodyButtons: {
    paddingTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btn: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    elevation: 2,
    flex: 1,
    backgroundColor: '#1E2125',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20
  },
});