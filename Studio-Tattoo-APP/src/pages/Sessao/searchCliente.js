import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, Alert, Modal, TextInput, FlatList
} from 'react-native'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'

import api from "../../services/api"


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class SearchCliente extends Component {

  state = {
    clientes: [],
    clienteSelecionado: {
      id: 0,
      nome: '',
      endereco: '',
      email: '',
    },
    nomeDigitado: '',
    page: 1,
    seed: 1,
    refreshing: false,
    loading: false
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      clientes: [],
      clienteSelecionado: {
        id: 0,
        nome: '',
        endereco: '',
        email: '',
      },
      nomeDigitado: '',
      page: 1,
      seed: 1,
      refreshing: false,
      loading: false
    })
  }

  buscarCliente = async () => {
    try {
      const res = await api.get(`/cliente/index/nome/${this.state.nomeDigitado}`);
      this.setState({
        ...this.state,
        clientes: res.data
      });
    } catch (err) {
      console.log(err)
    }
  }

  selecionarCliente = () => {
    if (this.state.clienteSelecionado.id == 0) {
      Alert.alert(
        "Atenção!",
        "Selecione algum cliente!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    } else {
      this.props.clienteSearch(this.state.clienteSelecionado)
      this.props.hideModal()
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 10,
          width: "86%",
          marginLeft: "14%"
        }}
      />
    );
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => {
      this.buscarCliente();
    })
  }

  itemList = (item) => {
    return (
      <TouchableOpacity style={styles.itemList}
        onPress={() => this.setState({ ...this.state, clienteSelecionado: item })}>
        <Avatar.Image source={avatarImg} size={70} style={styles.listPicture} />
        <View style={styles.itemListBody}>
          <Text style={styles.itemListNome}>{item.nome}</Text>
          <Text style={styles.itemListEmail}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.modalHandle}
      >
        <View style={styles.centeredView}>
          <Avatar.Image source={avatarImg} size={150} style={styles.picture} />
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.props.hideModal()}
            >
              <MaterialCommunityIcons name={'close-circle-outline'} size={28} color={'#353434'} />
            </TouchableOpacity>
            <View style={styles.containerInput}>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome..."
                placeholderTextColor="#00000f"
                onChangeText={nome => this.setState({ ...this.state, nomeDigitado: nome })}
                value={this.state.nomeDigitado}
              />
              <TouchableOpacity
                style={styles.btnInput}
                onPress={this.buscarCliente}
              >
                <Text style={styles.btnText}>Buscar</Text>
                <MaterialCommunityIcons name={'find-replace'} size={28} color={'#FFF'} />
              </TouchableOpacity>
            </View>
            <View style={styles.listBox}>
              <FlatList
                contentContainerStyle={styles.listView}
                data={this.state.clientes}
                keyExtractor={(item, index) => index.toString()}
                renderItem={
                  ({ item }) => this.itemList(item)
                }
                ItemSeparatorComponent={this.renderSeparator}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              />
            </View>
            <View style={styles.bodyButtons}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.selecionarCliente}
                underlayColor='#fff'>
                <Text style={styles.btnText}>Selecionar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => this.props.hideModal()}
                underlayColor='#fff'>
                <Text style={styles.btnText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: 'center',
  },
  picture: {
    position: 'relative',
    top: 50,
    elevation: 5,
    zIndex: 1
  },
  modalView: {
    zIndex: 0,
    backgroundColor: "white",
    borderRadius: 20,
    width: '90%',
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    width: 40
  },
  containerInput: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    width: 200,
    paddingStart: 5,
    backgroundColor: '#ccc',
    borderColor: '#00000F',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  inputText: {
    color: '#00000F',
    fontWeight: "bold",
    fontSize: 14,
  },
  btnInput: {
    flexDirection: 'row',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E2125'
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
    width: '40%',
    elevation: 2,
    backgroundColor: '#1E2125',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 14,
    marginRight: 5,
  },
  listBox: {
    marginTop: 20,
    width: '100%',
    height: 130,
    padding: 5,
    borderWidth: 1,
    borderColor: "#CED0CE",
    borderRadius: 5
  },
  itemList: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#121212',
    borderRadius: 10
  },
  listPicture: {
    margin: 5
  },
  itemListBody: {
    flexDirection: 'column'
  },
  itemListNome: {
    color: '#fff',
    fontWeight: "bold",
    fontSize: 14,
  },
  itemListEmail: {
    color: '#D4D7DB',
    fontWeight: "bold",
    fontSize: 14,
  }
});
