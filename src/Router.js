import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RoomsScreen from './screens/RoomsScreen';
import TablesScreen from './screens/TablesScreen';
import OrderScreen from './screens/OrderScreen';
import LoginScreen from './screens/LoginScreen';
import SplashScreen from './screens/SplashScreen';
import {COLORS} from './Config';
import IconButton from './components/icon-button/IconButton';
import useAuth from './common/hooks/useAuth';

const Stack = createNativeStackNavigator();

const HEADER_STYLE = {
  headerStyle: {
    backgroundColor: COLORS.primary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
  },
  headerTitleAlign: 'center',
};

const HeaderArrowLeft = props => {
  return (
    <IconButton
      icon="chevron-back-sharp"
      color={COLORS.white}
      size={30}
      onPress={props.onPress}
    />
  );
};

/**
 * Authenticated Stack
 */
function AuthenticatedStack() {
  return (
    <Stack.Navigator
      initialRouteName="RoomsScreen"
      screenOptions={HEADER_STYLE}>
      <Stack.Screen
        name="Rooms"
        component={RoomsScreen}
        options={{title: 'SALAS'}}
      />
      <Stack.Screen
        name="Tables"
        component={TablesScreen}
        options={({navigation}) => ({
          title: 'MESAS',
          headerLeft: () => <HeaderArrowLeft onPress={navigation.goBack} />,
        })}
      />
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={({navigation}) => ({
          title: 'PEDIDO',
          headerLeft: () => <HeaderArrowLeft onPress={navigation.goBack} />,
        })}
      />
    </Stack.Navigator>
  );
}

/**
 * Auth Stack
 */
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

function Router() {
  const {isLoadingSplash, isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isLoadingSplash ? (
        <SplashScreen />
      ) : (
        <>
          {!isAuthenticated && <AuthStack />}
          {isAuthenticated && <AuthenticatedStack />}
        </>
      )}
    </NavigationContainer>
  );
}

export default Router;
