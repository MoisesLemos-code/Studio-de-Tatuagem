import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet,
} from 'react-native'
import api from "../../services/api"

import CardCliente from '../../components/CardCliente'

export default class Cliente extends Component {

  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount = async () => {
    this._isMounted = true;
    try {
      const response = await api.get(`/cliente/list`);
      this.setState({ list: response.data });
    } catch (err) {
      console.log(err)
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateList = async () => {
    try {
      const response = await api.get(`/cliente/list`);
      this.setState({ list: response.data });
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listView}
          data={this.state.list}
          keyExtractor={(item, index) => index.toString()}
          renderItem={
            ({ item }) => <CardCliente
              item={item}
              onChange={this.updateList}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
  },
  listView: {
    alignItems: 'center'
  }
});