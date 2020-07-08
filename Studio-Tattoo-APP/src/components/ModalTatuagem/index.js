import React, { Component } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert, Modal
} from 'react-native'
import { Avatar } from 'react-native-paper';
import tatuagem from './../../img/tatuagem.png'
import { FontAwesome } from '@expo/vector-icons'
import Camera from '../Camera'


import api from "../../services/api"

export default class ModalTatuagem extends Component {

  state = {
    sessao_id: this.props.sessaoID,
    id: 0,
    descricao: "",
    tamanho: 0,
    desconto: 0,
    acrescimo: 0,
    valor: 0,
    openCamera: false,
    statusFoto: false,
    foto: ''
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      sessao_id: this.props.sessaoID,
      id: 0,
      descricao: "",
      tamanho: 0,
      desconto: 0,
      acrescimo: 0,
      valor: 0,
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

  salvarTattoo = async () => {
    try {
      if (this.state.descricao === '' || this.state.tamanho <= 0 || this.state.valor < 0) {
        Alert.alert(
          "Atenção!",
          "Preencha todos os campos corretamente!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      } else {
        await api.post(`/tattoo/insert`, {
          sessao_id: this.state.sessao_id,
          descricao: this.state.descricao,
          tamanho: this.state.tamanho,
          desconto: this.state.desconto,
          acrescimo: this.state.acrescimo,
          valor: this.state.valor,
        });
        Alert.alert(
          "Sucesso!",
          "Tattoo inserida com sucesso!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
        this.props.inserirItem()
      }
    }
    catch (err) {
      console.log(err)
      Alert.alert(
        "Falha!",
        "Não foi possível cadastrar!",
        [
          { text: "OK" }
        ],
        { cancelable: false }
      )
    }
  }

  editarTattoo = async () => {
    try {
      if (this.state.descricao === '' || this.state.tamanho <= 0 || this.state.valor < 0) {
        Alert.alert(
          "Atenção!",
          "Preencha todos os campos corretamente!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      } else {
        await api.put(`/tattto/update/${this.state.id}`, {
          descricao: this.state.descricao,
          tamanho: this.state.tamanho,
          valor: this.state.valor
        }, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (resposta.data.status === 505) {
          Alert.alert(
            "Falha!",
            resposta.data.mensagem,
            [
              { text: "OK" }
            ],
            { cancelable: false }
          )
        } else {
          this.props.updateItem(this.state)
        }
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

  excluirTattoo = () => {
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
              const resposta = await api.delete(`/tattoo/delete/${this.state.id}`);
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
              <Avatar.Image source={(this.state.statusFoto ? { uri: this.state.foto } : tatuagem)} size={150} style={styles.picture} />
              <FontAwesome style={styles.cameraIcon} name={'camera'} size={28} color={'#101010'} />
            </TouchableOpacity>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => this.props.hideModal()}
              >
                <FontAwesome name={'times-circle'} size={28} color={'#353434'} />
              </TouchableOpacity>
              <Text style={styles.textInputBody}>Descrição</Text>
              <TextInput
                style={styles.input}
                placeholder="...Rosa com fogo"
                value={this.state.descricao}
                onChangeText={descricao => this.setState({ ...this.state, descricao })}
              />
              <Text style={styles.textInputBody}>Tamanho</Text>
              <TextInput
                style={styles.input}
                placeholder="Tamanho em centímetros"
                keyboardType='numeric'
                onChangeText={tamanho => this.setState({ ...this.state, tamanho })}
              />
              <Text style={styles.textInputBody}>Valor (R$)</Text>
              <TextInput
                style={styles.input}
                placeholder="Valor da tatuagem"
                keyboardType='numeric'
                onChangeText={valor => this.setState({ ...this.state, valor })}
              />
              <View style={styles.bodyButtons}>
                <TouchableOpacity
                  style={styles.btnSalvar}
                  onPress={this.salvarTattoo}
                  underlayColor='#fff'>
                  <Text style={styles.btnText}>Salvar</Text>
                </TouchableOpacity>
                {this.state.id > 0 &&
                  <TouchableOpacity
                    style={styles.btnSalvar}
                    onPress={this.editarTattoo}
                    underlayColor='#fff'>
                    <Text style={styles.btnText}>Salvar</Text>
                  </TouchableOpacity>
                }
                {this.state.id > 0 &&
                  <TouchableOpacity
                    style={styles.btnExcluir}
                    onPress={this.excluirTattoo}
                    underlayColor='#fff'>
                    <Text style={styles.btnText}>Excluir</Text>
                  </TouchableOpacity>
                }
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
