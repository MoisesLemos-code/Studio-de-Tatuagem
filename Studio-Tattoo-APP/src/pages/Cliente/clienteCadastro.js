import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet,
  TouchableOpacity, TextInput, Alert
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'
import api from "../../services/api"

import Camera from '../../components/Camera/'

export default function ClienteCadastro() {
  const [user, setUser] = useState({
    foto: '',
    nome: '',
    endereco: '',
    email: ''
  });
  const [openCamera, setOpenCamera] = useState(false)
  const [statusFoto, setStatusFoto] = useState(false)


  salvarCliente = async () => {
    try {
      if (user.nome === '' || user.endereco === '' || user.email === '') {
        Alert.alert(
          "Atenção!",
          "Preencha todos os campos!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
      } else {
        await api.post(`/cliente/insert`, user);
        Alert.alert(
          "Sucesso!",
          "Cliente cadastrado com sucesso!",
          [
            { text: "OK" }
          ],
          { cancelable: false }
        )
        setUser({
          nome: '',
          endereco: '',
          email: ''
        })
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

  setarImagem = async (imagem) => {
    setOpenCamera(false)
    setUser({ ...user, foto: imagem })
    setStatusFoto(true)
  }

  return (
    <View style={styles.container}>
      {openCamera ?
        <Camera
          voltar={() => setOpenCamera(false)}
          capturarFoto={(imagem) => setarImagem(imagem)} />
        :
        <>
          <View style={styles.bodyInputs}>
            <TouchableOpacity
              style={styles.btnCamera}
              onPress={() => setOpenCamera(true)}
            >
              <Avatar.Image
                source={(statusFoto ? { uri: user.foto } : avatarImg)}
                size={150} style={styles.picture} />
              <FontAwesome style={styles.cameraIcon} name={'camera'} size={28} color={'#FFF'} />
            </TouchableOpacity>
            <Text style={styles.textInputBody}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome"
              type={'name'}
              value={user.nome}
              onChangeText={nome => setUser({ ...user, nome })}
            />
            <Text style={styles.textInputBody}>Endereço</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o endereço"
              type={'street-address'}
              value={user.endereco}
              onChangeText={endereco => setUser({ ...user, endereco })}
            />
            <Text style={styles.textInputBody}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o e-mail"
              type={'email'}
              keyboardType={"email-address"}
              value={user.email}
              onChangeText={email => setUser({ ...user, email })}
            />
          </View>
          <View style={styles.bodyButtons}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => salvarCliente()}
              underlayColor='#fff'>
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    justifyContent: 'center'
  },
  bodyInputs: {
    paddingHorizontal: 10,
  },
  btnCamera: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cameraIcon: {
    position: 'relative',
    right: 50,
    alignSelf: 'flex-end',
    elevation: 2
  },
  picture: {
    elevation: 1,
  },
  input: {
    height: 50,
    paddingStart: 5,
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 5
  },
  textInputBody: {
    marginTop: 20,
    fontWeight: "bold",
    color: '#FFFF'
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
    fontSize: 20,
  },
});