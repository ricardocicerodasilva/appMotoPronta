import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home'; 
import CadastrarMotos from './CadastrarMotos';
import AlterarMotos from './AlterarMotos'; 

const Stack = createStackNavigator();
export default function Rotas(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cadastrar" component={CadastrarMotos} /> 
      <Stack.Screen name="Alterar" component={AlterarMotos} />
    </Stack.Navigator>
  );
}
