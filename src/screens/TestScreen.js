import React, {useContext, useEffect, useReducer} from 'react';
import {View, StyleSheet, Text, Button, BackHandler} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsContext} from '../store/products-context';
import SettingsScreen from './SettingsScreen';
import axios from 'axios';

const Stack = createNativeStackNavigator();

/**
 * Auth Stack
 */
export function TestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TestScreen1" component={TestScreen1} />
      <Stack.Screen name="TestScreen2" component={TestScreen2} />
      <Stack.Screen name="TestScreen3" component={Counter} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

const initialState = {count: 0};

// The reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return {count: (state.count = 0)};
    default:
      return {count: state.count};
  }
}

export const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View>
      <Text>Count: {state.count}</Text>
      <Button onPress={() => dispatch({type: 'increment'})} title="Increment" />
      <Button onPress={() => dispatch({type: 'decrement'})} title="Decrement" />
      <Button onPress={() => dispatch({type: 'reset'})} title="Reset" />
    </View>
  );
};

export function TestScreen1({navigation}) {
  const prodCtx = useContext(ProductsContext);

  return (
    <View style={styles.rootContainer}>
      <Text>Screen 1 - Produtos {prodCtx.products?.length}</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => {
          navigation.navigate('TestScreen2');
        }}
      />
      <Button
        title="Go Settings"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
      <Button
        title="USErEDUCER tEST"
        onPress={() => {
          navigation.navigate('TestScreen3');
        }}
      />
    </View>
  );
}

export function TestScreen2() {
  const prodCtx = useContext(ProductsContext);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const backAction = () => {
      console.log('Entrou');
      /* Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]); */
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  /* useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        await sleep(5000);

        await prodCtx.fetchProducts({
          signal: controller.signal,
        });

        console.log('Fim Pedido Context');
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error.response?.data?.message);
        } else {
          console.log('Cancelado');
        }
      }
    }

    fetchData();

    return () => {
      console.log('Entrou');
      // If the component is unmounted, cancel the request
      controller.abort();
    };
  }, []); */

  return (
    <View style={styles.rootContainer}>
      <Text>Screen 2 - Produtos {prodCtx.products?.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
