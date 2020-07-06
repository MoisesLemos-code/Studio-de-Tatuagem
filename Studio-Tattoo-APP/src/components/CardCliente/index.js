import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'

import ModalCard from './modalCard'

export default class CardCliente extends Component {

  state = {
    modalVisible: false,
    item: {}
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      modalVisible: false,
      item: this.props.item
    })
  }

  showModal = () => {
    this.setState({ ...this.state, modalVisible: true })
  }

  updateItem = item => {
    this.setState({ modalVisible: false, item: item })
    //  this.props.onChange();
  }

  deleteItem = () => {
    this.setState({ ...this.state, modalVisible: false })
    //this.props.onChange();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.showModal}
      >
        <ModalCard
          modalHandle={this.state.modalVisible}
          hideModal={() => this.setState({ ...this.state, modalVisible: false })}
          item={this.state.item}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem} />
        <Avatar.Image source={avatarImg} size={70} style={styles.picture} />
        <View style={styles.containerBody}>
          <Text style={styles.textHead}>Nome</Text>
          <Text style={styles.textInfo}>{this.state.item.nome}</Text>
          <Text style={styles.textHead}>Endereco</Text>
          <Text style={styles.textInfo}>{this.state.item.endereco}</Text>
          <Text style={styles.textHead}>Email</Text>
          <Text style={styles.textInfo}>{this.state.item.email}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#1E2125',
    padding: 0,
    minWidth: '95%',
    maxWidth: '95%',
  },
  containerBody: {
    padding: 10,
  },
  picture: {
    alignSelf: 'center'
  },
  textHead: {
    color: '#D4D7DB'
  },
  textInfo: {
    fontSize: 20,
    color: '#FFFF'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
