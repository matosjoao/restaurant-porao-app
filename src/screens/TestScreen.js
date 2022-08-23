import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsContext} from '../store/products-context';
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
    </Stack.Navigator>
  );
}

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
    </View>
  );
}

export function TestScreen2() {
  const prodCtx = useContext(ProductsContext);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
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
  }, []);

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
