import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, Alert
} from 'react-native'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'

import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

import ModalTatuagem from '../../components/ModalTatuagem'
import SearchCliente from '../../components/SearchCliente'
import ListaTattoos from './listaTattoos'

import api from "../../services/api"


export default function SessaoCadastro(props) {
  const [modo, setModo] = useState('Iniciar Sessão')
  const [sessao, setSessao] = useState({
    id: 0,
    status: '',
    total_acrescimo: 0.0,
    total_desconto: 0.0,
    total_liquido: 0.0,
    cliente_id: 0.0,
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
  const [modalCliente, setModalCliente] = useState(false)
  const [modalTattoo, setModalTattoo] = useState(false)
  const [sessaoAlterada, setSessaoAlterada] = useState(false)

  useEffect(() => {
    if (props.sessao !== undefined && sessaoAlterada === false) {
      if (props.sessao.status === 'Aberta') {
        setModo('Concluír Sessão')
      } else if (props.sessao.status === 'Concluída') {
        setModo('Reabrir Sessão')
      } else {
        setModo('?')
      }
    }
  });

  salvarItem = () => {
    setModalTattoo(false)
    console.log(sessao)
  }

  inserirTattoo = () => {

    if (props.sessao !== undefined) {
      if (props.sessao.status === 'Concluída') {
        Alert.alert(
          "Atenção!",
          "Não é possível inserir tatuagens em uma sessão fechada!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      }
    } else if (sessao.id === 0) {
      Alert.alert(
        "Atenção!",
        "Inicie uma sessão primeiro!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    } else {
      setModalTattoo(true)
    }
  }

  setarCliente = async (obj) => {
    setCliente(obj)
    setSessao({ ...sessao, cliente_id: obj.id })
    if (sessao.id > 0) {
      try {
        const sessaoObj = await api.put(`/sessao/update/${sessao.id}`, {
          status: sessao.status,
          cliente_id: sessao.cliente_id
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
      } catch (err) {
        console.log(err)
      }
    }
  }

  iniciarSessao = async () => {
    if (cliente.id == 0) {
      Alert.alert(
        "Atenção!",
        "Selecione um cliente primeiro!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    } else {
      try {
        const obj = await api.post(`/sessao/insert/`, {
          status: "Aberta",
          total_acrescimo: 0.0,
          total_desconto: 0.0,
          total_liquido: 0.0,
          cliente_id: cliente.id
        })
        setSessao({
          id: obj.data.id,
          status: "Aberta",
          cliente_id: obj.data.cliente_id
        })
        setModo('Concluír Sessão')
      } catch (err) {
        Alert.alert(
          "Atenção!",
          "Não foi possível iniciar a sessão!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      }
    }
  }

  concluirSessao = async () => {
    try {
      Alert.alert(
        "Atenção!",
        "Sessão conclúida com sucesso!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
      setSessaoAlterada(true)
      setModo('Reabrir Sessão')
    } catch (err) {
      Alert.alert(
        "Atenção!",
        "Não foi possível concluir a sessão!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    }
  }

  reabrirSessao = async () => {
    try {

    } catch (err) {
      Alert.alert(
        "Atenção!",
        "Não foi possível reabrir a sessão!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    }
  }

  header = () => {
    return (
      <View style={styles.headerBox}>
        <View style={styles.header}>
          <ModalTatuagem
            modalHandle={modalTattoo}
            hideModal={() => setModalTattoo(false)}
            sessaoID={sessao.id}
            inserirItem={() => salvarItem()}
          />
          <Avatar.Image source={avatarImg} size={150} style={styles.picture} />
          <View style={styles.headerBody}>
            <Text style={styles.textHead}>Cliente</Text>
            <SearchCliente
              modalHandle={modalCliente}
              hideModal={() => setModalCliente(false)}
              clienteSearch={(cliente) => setarCliente(cliente)}
            />
            <TouchableOpacity
              style={styles.btnCliente}
              onPress={() => setModalCliente(true)}
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
        <TouchableOpacity
          style={styles.btnTattoo}
          onPress={() => inserirTattoo()}
        >
          <Text style={styles.textTattoo}>Inserir Tatuagem</Text>
          <FontAwesome5 name={'dragon'} size={25} color={'#FFF'} />
        </TouchableOpacity>
      </View>
    )
  }

  footer = () => {
    return (
      <View style={styles.bodyButtons}>
        {modo === 'Iniciar Sessão' &&
          <TouchableOpacity
            style={styles.btn}
            onPress={() => iniciarSessao()}
            underlayColor='#fff'>
            <Text style={styles.btnText}>{modo}</Text>
          </TouchableOpacity>
        }
        {modo === 'Concluír Sessão' &&
          <TouchableOpacity
            style={styles.btn}
            onPress={() => concluirSessao()}
            underlayColor='#fff'>
            <Text style={styles.btnText}>{modo}</Text>
          </TouchableOpacity>
        }
        {modo === 'Reabrir Sessão' &&
          <TouchableOpacity
            style={styles.btn}
            onPress={() => reabrirSessao()}
            underlayColor='#fff'>
            <Text style={styles.btnText}>{modo}</Text>
          </TouchableOpacity>
        }
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
  headerBox: {
    marginBottom: 10
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
  btnTattoo: {
    flexDirection: 'row',
    justifyContent: 'center',
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
  textTattoo: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 5
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