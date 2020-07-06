import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert, Modal
} from 'react-native'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'

import api from "../../services/api"


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class SearchCliente extends Component {

  state = {
    id: 0,
    nome: '',
    endereco: '',
    email: '',
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      id: 0,
      nome: '',
      endereco: '',
      email: '',
    })
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
            <Text style={styles.textInputBody}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              type={'name'}
              value={this.state.nome}
              onChangeText={nome => this.setState({ ...this.state, nome })}
            />
            <View style={styles.bodyButtons}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.editarCliente}
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
  input: {
    height: 50,
    paddingStart: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5
  },
  textInputBody: {
    marginTop: 20,
    fontWeight: "bold",
    color: '#353434'
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
