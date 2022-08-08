import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Rooms from './screens/Rooms';
import Tables from './screens/Tables';
import Order from './screens/Order';
import Login from './screens/Login';
import {COLORS} from './Config';
import IconButton from './components/icon-button/IconButton';
import {AuthContext, getToken} from './store/auth-context';

const Stack = createNativeStackNavigator();

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);

  return (
    <Stack.Navigator
      initialRouteName="Rooms"
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
        name="Rooms"
        component={Rooms}
        options={{
          title: 'SALAS',
          headerRight: () => (
            <IconButton
              icon="exit"
              color={COLORS.white}
              size={30}
              onPress={() => {
                authCtx.logout();
              }}
            />
          ),
        }}
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
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
function Router() {
  const authCtx = useContext(AuthContext);

  //TODO:: Colocar AppLoading - para mostrar o splashscreen enquanto vai buscar o token

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
    }

    fetchToken();
  }, [authCtx]);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default Router;
