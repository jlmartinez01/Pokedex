import React, {useEffect } from 'react';
import { View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-ui-lib';
import usePokemonCounter from '../hooks/usePokemonCounter';
import { colorPrimario, colorSecundario } from '../utils/designSystem';

export default function HeaderCounter(){
  const pokemonsCounter = usePokemonCounter()

  useEffect(() => {

  }, []);

    return (
        <SafeAreaView style={styles.headerStyle}>
            <Text style={styles.text} text50>{'Pokemones: '+pokemonsCounter.counter}</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    headerStyle:{
        backgroundColor:colorSecundario,
        justifyContent:'center',
        alignItems:'center',
        padding:10
    },
    text:{
        color:colorPrimario
    }
})
