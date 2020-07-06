import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, Alert, Modal
} from 'react-native'
import { SearchBar, ListItem } from 'react-native-elements';
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
    nomeDigitado: ''
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
      nomeDigitado: ''
    })
  }

  buscarCliente = async (nome) => {
    this.setState({ ...this.state, nomeDigitado: nome })
    try {
      const res = await api.get(`/cliente/index/nome/${this.state.nomeDigitado}`);
      this.setState({
        clientes: [res.data]
      });
      console.log(this.state.clientes)
    } catch (err) {
      console.log(err)
    }
  }
  selecionarCliente = () => {
    if (clienteSelecionado.id == 0) {
      Alert.alert(
        "Atenção!",
        "Selecione algum cliente!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    }
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
            <SearchBar
              placeholder="Digite o nome..."
              onChangeText={nome => this.buscarCliente(nome)}
              value={this.state.nomeDigitado}
              containerStyle={styles.searchBarContainer}
              inputStyle={styles.searchBarInput}
              placeholderTextColor='#121212'
              inputContainerStyle={styles.searchBarInputContainer}
            />
            <View>
              {
                this.state.clientes.map((obj, i) => (
                  <ListItem
                    style={{ backgroundColor: 'red' }}
                    key={i}
                    title={obj.nome}
                    titleStyle={{ color: '#121212' }}
                    subtitle={obj.email}
                    bottomDivider
                  />
                ))
              }
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
  searchBarContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  searchBarInput: {
    borderRadius: 5,
    color: '#121212'
  },
  searchBarInputContainer: {
    backgroundColor: '#ccc',
    borderRadius: 10
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
    paddingLeft: 10,
    paddingRight: 10
  }
});
