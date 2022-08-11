import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import RoomsScreen from './screens/RoomsScreen';
import Tables from './screens/Tables';
import Order from './screens/Order';
import Login from './screens/Login';
import SettingsScreen from './screens/SettingsScreen';
import {COLORS} from './Config';
import IconButton from './components/icon-button/IconButton';
import {AuthContext, getToken} from './store/auth-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        component={Tables}
        options={({navigation}) => ({
          title: 'MESAS',
          headerLeft: () => <HeaderArrowLeft onPress={navigation.goBack} />,
        })}
      />
      <Stack.Screen
        name="Order"
        component={Order}
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
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

/**
 * Main Navigation
 * With bottom tabs
 */
function BottomTabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        ...HEADER_STYLE,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 60,
          borderTopColor: COLORS.gray,
          borderTopWidth: 1,
          borderLeftColor: COLORS.gray,
          borderLeftWidth: 1,
          borderRightColor: COLORS.gray,
          borderRightWidth: 1,
          marginHorizontal: -10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={AuthenticatedStack}
        options={{
          headerShown: false,
          title: 'Início',
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="home-outline" size={size} color={color} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'CONTA',
          tabBarIcon: ({focused, color, size}) => {
            return <Icon name="settings-outline" size={size} color={color} />;
          },
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
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
