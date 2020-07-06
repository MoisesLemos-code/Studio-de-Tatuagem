import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet
} from 'react-native'
import api from "../../services/api"

import CardSessao from '../CardSessao'

export default class ListSessao extends Component {

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
      const res = await api.get(`/sessao/list/page`);
      this.setState({
        list: res.data || [],
        loading: false,
        refreshing: false
      });
      console.log(this.state.list)
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

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listView}
          data={this.state.list}
          keyExtractor={item => item.id}
          renderItem={
            ({ item }) => <CardSessao
              item={item}
            />
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
});