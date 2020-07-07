import React, { Component } from 'react';
import {
  View, FlatList, StyleSheet
} from 'react-native'
import api from "../../services/api"

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

  cardItem = (obj) => {
    console.log(obj)
    return (
      <View style={{ height: 90, width: 90 }}>
        <Text>teste</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listView}
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
});