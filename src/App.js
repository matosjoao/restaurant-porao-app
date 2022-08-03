import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Rooms from './screens/Rooms';
import Tables from './screens/Tables';
import Order from './screens/Order';
import Login from './screens/Login';
import {COLORS} from './Config';
import IconButton from './components/icon-button/IconButton';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {backgroundColor: COLORS.primary},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'Roboto-Bold',
            fontSize: 22,
          },
          headerTitleAlign: 'center',
        }}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Rooms"
          component={Rooms}
          options={{title: 'SALAS'}}
        />
        <Stack.Screen
          name="Tables"
          component={Tables}
          options={({navigation}) => ({
            title: 'MESAS',
            headerLeft: () => (
              <IconButton
                icon="chevron-back-sharp"
                color={COLORS.white}
                size={30}
                onPress={navigation.goBack}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={({navigation}) => ({
            title: 'PEDIDO',
            headerLeft: () => (
              <IconButton
                icon="chevron-back-sharp"
                color={COLORS.white}
                size={30}
                onPress={navigation.goBack}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
