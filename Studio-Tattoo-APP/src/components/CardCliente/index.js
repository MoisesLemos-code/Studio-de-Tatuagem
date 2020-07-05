import React, { Component } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

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

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  updateItem = item => {
    this.setState({ modalVisible: false, item: item })
    this.props.onChange();
  }

  deleteItem = () => {
    this.setState({ modalVisible: false })
    this.props.onChange();
  }

  render() {
    return (
      <View style={styles.container} >
        <ModalCard
          modalHandle={this.state.modalVisible}
          hideModal={() => this.setState({ ...this.state, modalVisible: false })}
          item={this.state.item}
          updateItem={this.updateItem}
          deleteItem={this.deleteItem} />
        <View style={styles.picture}></View>
        <View style={styles.containerBody}>
          <Text style={styles.textHead}>Nome</Text>
          <Text style={styles.textInfo}>{this.state.item.nome}</Text>
          <Text style={styles.textHead}>Endereco</Text>
          <Text style={styles.textInfo}>{this.state.item.endereco}</Text>
          <Text style={styles.textHead}>Email</Text>
          <Text style={styles.textInfo}>{this.state.item.email}</Text>
        </View>
        <TouchableOpacity
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Editar</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#667581',
    padding: 0,
    marginVertical: 10,
    minWidth: '95%',
    maxWidth: '95%',
  },
  containerBody: {
    padding: 10,
  },
  picture: {
    width: 110,
    height: 110,
    borderRadius: 100,
    overflow: 'hidden',
    backgroundColor: '#FFFF',
    alignSelf: 'center',
    margin: 0
  },
  textHead: {
    color: '#353434'
  },
  textInfo: {
    fontSize: 20,
    color: '#FFFF'
  },
  openButton: {
    backgroundColor: '#73748E',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
});
