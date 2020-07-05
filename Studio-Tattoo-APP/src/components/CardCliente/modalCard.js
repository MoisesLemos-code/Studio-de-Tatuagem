import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert, Modal
} from 'react-native'

import api from "../../services/api"

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class ModalCard extends Component {

  state = {
    nome: this.props.item.nome,
    endereco: this.props.item.endereco,
    email: this.props.item.email,
    id: this.props.item.id,
  }

  constructor(props) {
    super(props);
  }


  editarCliente = async () => {
    try {
      if (this.state.nome === '' || this.state.endereco === '' || this.state.email === '') {
        Alert.alert(
          "Atenção!",
          "Preencha todos os campos!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      } else {
        await api.put(`/cliente/update/${this.state.id}`, {
          nome: this.state.nome,
          endereco: this.state.endereco,
          email: this.state.email
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        this.props.updateItem(this.state)
      }
    }
    catch (err) {
      console.log(err)
      Alert.alert(
        "Falha!",
        "Não foi possível alterar!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    }
  }

  excluirCliente = async () => {
    try {
      await api.delete(`/cliente/delete/${this.state.id}`);
      this.props.deleteItem()
    } catch (err) {
      console.log(err)
      Alert.alert(
        "Falha!",
        "Não foi possível excluir!",
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
        visible={() => this.props.modalHandle()}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.props.hideModal()}
            >
              <MaterialCommunityIcons name={'close-circle-outline'} size={28} color={'#353434'} />
            </TouchableOpacity>
            <Text style={styles.textInputBody}>Nome</Text>
            <TextInput
              autoFocus={true}
              style={styles.input}
              placeholder="Digite o nome"
              type={'name'}
              value={this.state.nome}
              onChangeText={nome => this.setState({ ...this.state, nome })}
            />
            <Text style={styles.textInputBody}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o endereço"
              type={'street-address'}
              value={this.state.endereco}
              onChangeText={endereco => this.setState({ ...this.state, endereco })}
            />
            <Text style={styles.textInputBody}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o e-mail"
              type={'email'}
              keyboardType={"email-address"}
              value={this.state.email}
              onChangeText={email => this.setState({ ...this.state, email })}
            />
            <View style={styles.bodyButtons}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.editarCliente}
                underlayColor='#fff'>
                <Text style={styles.btnText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.excluirCliente}
                underlayColor='#fff'>
                <Text style={styles.btnText}>Excluir</Text>
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
    marginTop: 22
  },
  modalView: {
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
    width: '30%',
    elevation: 2,
    backgroundColor: '#667581',
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
  },
});
