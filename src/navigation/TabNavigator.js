import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image, StatusBar } from 'react-native';
import ProfileStack from './ProfileStack';
import PokedexStack from './PokedexStack';
import CounterStack from './CounterStack';
import { colorPrimario, colorSecundario, colorTercero } from '../utils/designSystem';
import Ionicon from 'react-native-vector-icons/Ionicons'

const Tab = createMaterialBottomTabNavigator();

export default function TabNavigator() {
    return (
        <>
            <StatusBar translucent barStyle='dark-content' backgroundColor='transparent' />
            <Tab.Navigator
                activeColor={colorSecundario}
                inactiveColor={colorTercero}
                barStyle={{ backgroundColor: colorPrimario }}
            >
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStack}
                    options={{
                        title: 'Perfil',
                        tabBarIcon: ({ color, focused }) => (
                             <Ionicon name='person' size={20} color={focused?colorSecundario:colorTercero}/>
                        ),
                    }} />
                <Tab.Screen
                    name="PokedexStack"
                    component={PokedexStack}
                    options={{
                        title: 'Pokedex',
                        tabBarIcon: ({ color, focused }) => (
                            focused
                            ?
                            <Image style={{ height: '100%', width: '100%' }} source={require('../assets/img/pokebola_activo.png')} resizeMode='contain' />
                            :
                            <Image style={{ height: '100%', width: '100%' }} source={require('../assets/img/pokebola.png')} resizeMode='contain' />
                        ),
                    }} />
                <Tab.Screen
                    name="CounterStack"
                    component={CounterStack}
                    options={{
                        title: 'Contador',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicon name='bonfire-sharp' size={20} color={focused?colorSecundario:colorTercero}/>
                        ),
                    }} />
            </Tab.Navigator>
        </>
    );
}