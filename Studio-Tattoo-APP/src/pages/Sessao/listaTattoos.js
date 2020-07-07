import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, Text
} from 'react-native'
import api from "../../services/api"
import { Avatar } from 'react-native-paper';
import tatuagem from './../../img/tatuagem.png'


export default class ListTattos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sessao: this.props.sessaoID,
      list: [],
      page: 1,
      seed: 1,
      refreshing: false,
      loading: false
    }
  }

  componentDidMount() {
    this.updateList()
    console.log(this.state.sessao)
  }

  updateList = async () => {
    try {
      const res = await api.get(`/sessao/index/${this.state.sessao}`);
      this.setState({
        list: res.data.tattoos || [],
        loading: false,
        refreshing: false
      });
    } catch (err) {
      this.setState({
        loading: false,
        refreshing: false
      })
    }
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
      seed: this.state.seed + 1
    }, () => {
      this.updateList();
    })
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

  cardItem = (obj) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Avatar.Image source={tatuagem} size={150} style={styles.picture} />
          <Text style={styles.itemDescricao}>{obj.descricao}</Text>
        </View>
        <View style={styles.itemBody}>
          <Text style={styles.itemTamanho}>Tamanho: {obj.tamanho}cm</Text>
          <Text style={styles.itemValor}>Valor: R${obj.valor}</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item }) => this.cardItem(item)
          }
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.props.header}
          ListFooterComponent={this.props.footer}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  itemContainer: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    overflow: 'hidden'
  },
  itemHeader: {
    margin: 10
  },
  picture: {
    marginTop: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center'
  },
  itemDescricao: {
    alignSelf: 'center',
    fontWeight: "bold",
    fontSize: 24,
    color: '#FFF'
  },
  itemBody: {
    paddingLeft: 10,
    backgroundColor: '#1E2125',
  },
  itemTamanho: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#FFF'
  },
  itemValor: {
    fontWeight: "bold",
    fontSize: 20,
    color: '#FFF'
  }
});