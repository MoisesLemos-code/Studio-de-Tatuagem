import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import realizarSessao from './realizarSessao'
import sessaoLista from './../../components/ListSessao/listAll'


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Cadastro"
      activeColor="#3498db"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: '#121212' }}
    >
      <Tab.Screen name="Cadastro" component={realizarSessao}
        options={{
          tabBarLabel: 'Cadastrar cliente',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-plus" color={color} size={26} />
          ),
        }} />
      <Tab.Screen name="Lista" component={sessaoLista}
        options={{
          tabBarLabel: 'Visualizar cadastros',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-search" color={color} size={26} />
          ),
        }} />
    </Tab.Navigator>
  );
}

