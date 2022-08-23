import React from 'react';
import { TouchableOpacity, StyleSheet,View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfileScreen from '../screens/Profile/MyProfileScreen';
import EditProfileScreen from '../screens/Profile/EditProfileScreen';
import HeaderBack from './HeadersNavigation/HeaderBack';
import { colorPrimario, colorSecundario } from '../utils/designSystem';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { SAFE_AREA_PADDING } from '../utils/constants';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        component={MyProfileScreen}
        options={(route) =>
        ({
          headerTitle: '',
          headerRight: () => (
            <View style={styles.editarIconView}>
              <TouchableOpacity style={styles.editarIcon} onPress={() => route.navigation.navigate('EditProfileScreen')}>
                <Ionicon name="pencil" size={30} color={colorSecundario} style={styles.icon} />
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
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={(route) =>
        ({
          headerTitle: 'Editar perfil',
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
  editarIconView: {
    right: SAFE_AREA_PADDING.paddingRight,
  },
  editarIcon: {
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

