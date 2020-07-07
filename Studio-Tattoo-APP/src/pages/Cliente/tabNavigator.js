import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'

import clienteCadastro from './clienteCadastro'
import clienteLista from './clienteLista'


const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Cadastro"
      activeColor="#3498db"
      inactiveColor="#f0edf6"
      barStyle={{ backgroundColor: '#121212' }}
    >
      <Tab.Screen name="Cadastro" component={clienteCadastro}
        options={{
          tabBarLabel: 'Cadastrar cliente',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-plus" color={color} size={20} />
          ),
        }} />
      <Tab.Screen name="Lista" component={clienteLista}
        options={{
          tabBarLabel: 'Visualizar cadastros',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="list" color={color} size={20} />
          ),
        }} />
    </Tab.Navigator>
  );
}

