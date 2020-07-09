import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Cliente from './pages/Cliente/index';
import Sessao from './pages/Sessao/index'
import Home from './pages/Home/index';

const Drawer = createDrawerNavigator();

export default function Routes() {

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName='Home'
        drawerType='slide'
        drawerStyle={{
          backgroundColor: '#121212',
          width: 240,
        }}
        drawerContentOptions={{
          activeTintColor: '#3498db',
          labelStyle: { color: '#FFF' }
        }}
      >
        <Drawer.Screen name="Home" component={Home} options={{ title: "Início" }} />
        <Drawer.Screen name="Cliente"
          component={Cliente}
          options={{ title: "Cadastro de Cliente" }} />
        <Drawer.Screen name="Sessao"
          component={Sessao}
          options={{ title: "Iniciar Sessão" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
