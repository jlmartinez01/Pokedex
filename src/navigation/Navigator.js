import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  NavigationContainer,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../components/Splashscreen.js';
import { db, forFade } from '../utils/constants';
import FlashMessage from 'react-native-flash-message';
import customStyles from '../utils/customStyles';
import TabNavigator from './TabNavigator';
import { colorSecundario } from '../utils/designSystem.js';
import { PokemonProvider } from '../context/PokemonContext.js';
import usePokemonCounter from '../hooks/usePokemonCounter.js';
const StackContainer = createStackNavigator();

export default function Navigator() {
  const pokemonCounter = usePokemonCounter()
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    createTables()
  }, []);

  async function createTables() {
    await promise1()
    await promise2()
    await promise3()
    setSplash(false)
  }


  function promise1() {
    return new Promise((resolve, reject) => {
      //Pokemones
      db.transaction(function (txn) {
        const sql = 'CREATE TABLE IF NOT EXISTS Pokemones(PokemonId INTEGER PRIMARY KEY,name VARCHAR(50))'
        txn.executeSql(sql, [], (tx, results) => {

        });

        const sql2 = `SELECT * FROM Pokemones`
        txn.executeSql(sql2, [], (tx, results) => {
          pokemonCounter.update(results.rows.length)
          resolve()
        });
      })
    })
  }

  function promise2() {
    return new Promise((resolve, reject) => {
      //Types
      db.transaction(function (txn) {
        const sql = 'CREATE TABLE IF NOT EXISTS Types(TypeId INTEGER PRIMARY KEY,PokemonId int (11),name VARCHAR(50))'
        txn.executeSql(sql, [], (tx, results) => {

        });

        const sql2 = `SELECT * FROM Types`
        txn.executeSql(sql2, [], (tx, results) => {
          console.log(results)
        });
        resolve()
      })
    })
  }

  function promise3() {
    return new Promise((resolve, reject) => {
      //Moves
      db.transaction(function (txn) {
        const sql = 'CREATE TABLE IF NOT EXISTS Moves(MoveId INTEGER PRIMARY KEY,PokemonId int (11),name VARCHAR(50))'
        txn.executeSql(sql, [], (tx, results) => {
          
        });

        const sql2 = `SELECT * FROM Moves`
        txn.executeSql(sql2, [], (tx, results) => {
          console.log(results)
        });
        resolve()
      })
    })
  }



  return (
      <NavigationContainer>
        <View style={{ flex: 1, backgroundColor: colorSecundario }}>
          <StackContainer.Navigator headerShown="none" screenOptions={{ cardStyleInterpolator: forFade }}>
            {
              splash
                ?
                <StackContainer.Screen name='Splash' component={SplashScreen} options={{ headerShown: false }} />
                :
                <>
                  <StackContainer.Screen name='Inside' component={TabNavigator} options={{ headerShown: false }} />
                </>
            }
          </StackContainer.Navigator>
        </View>
        <FlashMessage position="center" floating style={customStyles.messageStyle} />
      </NavigationContainer>

  )





}
