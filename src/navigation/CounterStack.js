import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CounterScreen from '../screens/Counter/CounterScreen';
import HeaderCounter from '../components/HeaderCounter';
const Stack = createStackNavigator();

export default function CounterStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CounterScreen"
        component={CounterScreen}
        options={(route) =>
          ({
            headerTitle: '',
            header: () => (
              <HeaderCounter/>
            )
          })
        }
      />
    </Stack.Navigator>
  );
}