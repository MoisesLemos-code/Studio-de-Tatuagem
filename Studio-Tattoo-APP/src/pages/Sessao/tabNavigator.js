import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import maquinaTatuar from '../../img/maquina_tatuar.png'

import realizarSessao from './realizarSessao'
import sessaoLista from './../../components/ListSessao/listAll'


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Sessao"
      activeColor="#3498db"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: '#121212' }}
    >
      <Tab.Screen name="Sessao" component={realizarSessao}
        options={{
          tabBarLabel: 'Sessão',
          tabBarIcon: ({ color }) => (
            <Image source={maquinaTatuar} style={{ tintColor: color }} width={26} height={26} />
          ),
        }} />
      <Tab.Screen name="Lista" component={sessaoLista}
        options={{
          tabBarLabel: 'Visualizar sessões',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" color={color} size={20} />
          ),
        }} />
    </Tab.Navigator>
  );
}

