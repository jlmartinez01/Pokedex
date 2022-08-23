import React from 'react';
import { TouchableOpacity, StyleSheet,View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import PokedexScreen from '../screens/Pokedex/PokedexScreen';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { SAFE_AREA_PADDING } from '../utils/constants';
import { colorPrimario, colorSecundario } from '../utils/designSystem';
import AddPokemonScreen from '../screens/Pokedex/AddPokemonScreen';
import HeaderBack from './HeadersNavigation/HeaderBack';

const Stack = createStackNavigator();

export default function PokedexStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokedexScreen"
        component={PokedexScreen}
        options={(route) =>
        ({
          headerTitle: '',
          headerRight: () => (
            <View style={styles.moreIconView}>
              <TouchableOpacity style={styles.moreIcon} onPress={() => route.navigation.navigate('AddPokemonScreen')}>
                <Ionicon name="md-add" size={30} color={colorSecundario} style={styles.icon} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: colorSecundario
          }
        })
        }
      />
       <Stack.Screen
        name="AddPokemonScreen"
        component={AddPokemonScreen}
        options={(route) =>
        ({
          headerTitle: 'Añadir pokemon',
          headerLeft: () => <HeaderBack onPress={() => route.navigation.goBack()} />,
          headerStyle: {
            backgroundColor: colorSecundario
          }
        })
        }
      />
    </Stack.Navigator>
  );
}


const styles = StyleSheet.create({
  moreIconView: {
    right: SAFE_AREA_PADDING.paddingRight,
  },
  moreIcon: {
    backgroundColor: colorPrimario,
    borderRadius: 50,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 20,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },

});

