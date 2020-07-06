import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Moment from 'moment';
import { Avatar } from 'react-native-paper';
import avatarImg from './../../img/avatar.png'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default class CardSessao extends Component {

  state = {
    item: {},
    cliente: {}
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.setState({
      item: this.props.item,
      cliente: this.props.item.cliente
    })
  }

  updateItem = item => {
    //this.setState({ modalVisible: false, item: item })
    //  this.props.onChange();
  }

  deleteItem = () => {
    //this.setState({ ...this.state, modalVisible: false })
    //this.props.onChange();
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
      >
        <View style={styles.head}>
          <Avatar.Image source={avatarImg} size={70} style={styles.picture} />
          <View style={styles.headSub}>
            <Text style={styles.nomeData}>{this.state.cliente.nome}</Text>
            <Text style={styles.textHead}>Status</Text>
            <Text style={styles.textInfo}>{this.state.item.status}</Text>
          </View>
        </View>
        <View style={styles.containerBody}>
          <Text style={styles.textInfo}>Total: R${this.state.item.total_liquido}</Text>
          <View style={styles.dataAbertura}>
            <Text style={styles.textDataAbertura}>
              {Moment(this.state.item.createdAt).format('h:mm a' + " - " + "D MMM YYYY ")}</Text>
            <MaterialCommunityIcons name={'calendar-month'} size={20} color={'#FFF'} />
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#1E2125',
    padding: 0,
    minWidth: '95%',
    maxWidth: '95%',
  },
  head: {
    flexDirection: 'row'
  },
  headSub: {
    flexDirection: 'column'
  },
  picture: {
    margin: 10
  },
  nomeData: {
    fontSize: 24,
    color: '#FFFF',
    fontWeight: "bold",
  },
  textHead: {
    color: '#D4D7DB'
  },
  textInfo: {
    fontSize: 20,
    color: '#FFFF',
    fontWeight: "bold",
  },
  containerBody: {
    padding: 10,
  },
  textDataAbertura: {
    fontSize: 15,
    color: '#FFFF',
    fontWeight: "bold",
  },
  dataAbertura: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end'
  },
});
