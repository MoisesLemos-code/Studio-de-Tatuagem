import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'

import { FontAwesome } from '@expo/vector-icons'

import SearchCliente from './searchCliente'
import ListaTattoos from './listaTattoos'

import api from "../../services/api"


export default function SessaoCadastro() {
  const [sessao, setSessao] = useState({
    id: 8,
    status: '',
    total_acrescimo: 0.0,
    total_desconto: 0.0,
    total_liquido: 0.0,
    cliente_id: 0.0,
    modo: 'iniciar'
  });
  const [list, setLista] = useState({
    data: [],
    page: 1,
    seed: 1,
    refreshing: false,
    loading: false
  })
  const [cliente, setCliente] = useState({
    id: 0,
    nome: 'Selecione o cliente',
    endereco: '---',
    email: '---',
  })
  const [modal, setModal] = useState(false)

  header = () => {
    return (
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
            <FontAwesome name={'search'} size={25} color={'#FFF'} />
          </TouchableOpacity>
          <Text style={styles.textHead}>Email</Text>
          <Text style={styles.textInfo}>{cliente.email}</Text>
          <Text style={styles.textHead}>Endereço</Text>
          <Text style={styles.textInfo}>{cliente.endereco}</Text>
        </View>
      </View>
    )
  }

  footer = () => {
    return (
      <View style={styles.bodyButtons}>
        <TouchableOpacity
          style={styles.btn}
          // onPress={() => salvarSessao()}
          underlayColor='#fff'>
          <Text style={styles.btnText}>{(
            sessao.modo === 'iniciar'
              ? 'Iniciar Sessão'
              : (sessao.modo === 'encerrar' ?
                'Encerrar Sessão'
                : 'Reabrir Sessão')
          )}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ListaTattoos
        sessaoID={sessao.id}
        header={() => header()}
        footer={() => footer()} />
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
  header: {
    padding: 10,
    backgroundColor: '#1E2125',
    elevation: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10
  },
  headerBody: {
    padding: 5,
  },
  picture: {
    marginTop: 10,
    alignSelf: 'center'
  },
  textHead: {
    marginTop: 10,
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
  body: {
    marginTop: 10,
    backgroundColor: '#FFF',
    elevation: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 300
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