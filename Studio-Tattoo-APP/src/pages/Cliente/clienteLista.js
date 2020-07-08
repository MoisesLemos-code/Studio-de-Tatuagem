import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet, ActivityIndicator
} from 'react-native'
import api from "../../services/api"

import CardCliente from '../../components/CardCliente'

export default class Cliente extends Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      page: 1,
      seed: 1,
      refreshing: false,
      loading: false
    }
  }

  componentDidMount() {
    this.updateList()
  }

  updateList = async () => {
    try {
      const res = await api.get(`/cliente/list`);
      this.setState({
        list: res.data || [],
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

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listView}
          data={this.state.list}
          keyExtractor={(item, index) => item.id.toString()}
          renderItem={
            ({ item }) => <CardCliente
              item={item}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter}
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
    flex: 1,
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
});