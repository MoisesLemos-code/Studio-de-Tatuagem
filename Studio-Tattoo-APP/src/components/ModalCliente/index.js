import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert, Modal
} from 'react-native'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'
import { FontAwesome } from '@expo/vector-icons'
import Camera from '../Camera'


import api from "../../services/api"

export default class ModalCliente extends Component {

  state = {
    id: this.props.item.id,
    nome: this.props.item.nome,
    endereco: this.props.item.endereco,
    email: this.props.item.email,
    openCamera: false,
    statusFoto: false,
    foto: ''
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      id: this.props.item.id,
      nome: this.props.item.nome,
      endereco: this.props.item.endereco,
      email: this.props.item.email,
      openCamera: false,
      statusFoto: false,
      foto: ''
    })
  }

  setarImagem = async (imagem) => {
    this.setState({
      ...this.state,
      openCamera: false,
      foto: imagem,
      statusFoto: true
    })
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

  excluirCliente = () => {
    try {
      Alert.alert(
        'Atenção!',
        'Deseja realmente excluir este registro?',
        [
          {
            text: 'Cancelar',
            onPress: () => { },
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: async () => {
              const resposta = await api.delete(`/cliente/delete/${this.state.id}`);
              if (resposta.data.status === 505) {
                Alert.alert(
                  "Falha!",
                  resposta.data.mensagem,
                  [
                    { text: "OK" }
                  ],
                  { cancelable: false }
                )
              }
              this.props.deleteItem()
            }
          },
        ],
        { cancelable: false },
      );
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
        visible={this.props.modalHandle}
      >
        {this.state.openCamera ?
          <Camera
            voltar={() => this.setState({ ...this.state, openCamera: false })}
            capturarFoto={(imagem) => this.setarImagem(imagem)} />
          :
          <View style={styles.centeredView}>
            <TouchableOpacity
              style={styles.btnCamera}
              onPress={() => this.setState({ ...this.state, openCamera: true })}
            >
              <Avatar.Image source={(this.state.statusFoto ? { uri: this.state.foto } : avatarImg)} size={150} style={styles.picture} />
              <FontAwesome style={styles.cameraIcon} name={'camera'} size={28} color={'#101010'} />
            </TouchableOpacity>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => { this.props.hideModal(), this.setState({ ...this.state, statusFoto: false }) }}
              >
                <FontAwesome name={'times-circle'} size={28} color={'#353434'} />
              </TouchableOpacity>
              <Text style={styles.textInputBody}>Nome</Text>
              <TextInput
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
                  style={styles.btnSalvar}
                  onPress={this.editarCliente}
                  underlayColor='#fff'>
                  <Text style={styles.btnText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnExcluir}
                  onPress={this.excluirCliente}
                  underlayColor='#fff'>
                  <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
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
  btnCamera: {
    justifyContent: 'center',
    elevation: 10,
  },
  cameraIcon: {
    position: 'relative',
    right: 10,
    alignSelf: 'flex-end',
    elevation: 15,
  },
  picture: {
    backgroundColor: '#fff',
    alignSelf: 'center',
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
  btnSalvar: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    width: '30%',
    elevation: 2,
    backgroundColor: '#1E2125',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff'
  },
  btnExcluir: {
    marginHorizontal: 10,
    marginTop: 10,
    padding: 10,
    width: '30%',
    elevation: 2,
    backgroundColor: '#FF5566',
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
