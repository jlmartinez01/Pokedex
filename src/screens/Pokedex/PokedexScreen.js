import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { db, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants';
import { colorPrimario, colorSecundario, colorTercero } from '../../utils/designSystem';
import { Card } from 'react-native-ui-lib';
import Spinner from '../../components/Spinner';
import { useNavigation } from '@react-navigation/native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import Modal from "react-native-modal";
import { Text, Button } from 'react-native-ui-lib';
import { getDetallePokemon } from '../../utils/functions';
import usePokemonCounter from '../../hooks/usePokemonCounter';

export default function PokedexScreen() {
  const pokemonCounter = usePokemonCounter()
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true)
  const [pokemones, setPokemones] = useState([])
  const [heightScreen, setHeightScreen] = useState(0)
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [types, setTypes] = useState([])
  const [moves, setMoves] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadPokemons()
    });
    return unsubscribe;
  }, [navigation]);


  const keyExtractor = useCallback((item) => item.PokemonId, [])


  const renderItem = useCallback(({ item }) =>
  (
      heightScreen != 0
        ?
        <Card height={(heightScreen / 2) - 10} activeOpacity={1} style={styles.cajaView} onPress={() => console.log('pressed')}>
          <Card.Section content={[{ text: 'Pokemon: ' + item.name, text60: true, grey10: true }]} contentStyle={{ alignItems: 'center' }} />
          <Card.Section content={[{ text: 'Type: ' + item.type.name, text70: true, grey10: true }]} contentStyle={{ alignItems: 'center' }} />
          <Card.Section content={[{ text: 'Move: ' + item.moves[0].name, text70: true, grey10: true }]} contentStyle={{ alignItems: 'center' }} />
          <Card.Section content={[{ text: 'Move: ' + item.moves[1].name, text70: true, grey10: true }]} contentStyle={{ alignItems: 'center' }} />
          <TouchableOpacity onPress={() => borrar(item)}  style={styles.deleteViewButton}>
            <Ionicon name='trash' color={colorTercero} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadDetallePokemon(item.name)} style={styles.detalleViewButton}>
            <Ionicon name='logo-electron' color={colorTercero} size={30} />
          </TouchableOpacity>
        </Card>
        :
        null
    ),[heightScreen])


  const handleHeight = (nativeEvent) => {
    setHeightScreen(nativeEvent.layout.height)
  }


  const keyExtractorType = useCallback((item) => item.type.name, [])
  const keyExtractorMove = useCallback((item) => item.move.name, [])
  const renderItemType = useCallback(({ item }) =>
  (
    <TouchableOpacity style={styles.cajaView}>
      <Text text70>{item.type.name}</Text>
    </TouchableOpacity>

  ), [])


  const renderItemMove = useCallback(({ item }) =>
  (
    <TouchableOpacity style={styles.cajaView}>
      <Text text70>{item.move.name}</Text>
    </TouchableOpacity>

  ), [])

  const renderEmptyComponent = useCallback(({ }) =>
  (
    <View style={styles.containEmpty}>
      <Text text70>{'No hay pokemones en tu pokedex'}</Text>
    </View>

  ), [])


  function borrar(item) {
    Alert.alert(
      "Pokedex",
      "¿Está seguro que desea borrar el pokemon?",
      [
        {
          text: "Cancelar",
          onPress: () => {
            return null;
          },
        },
        {
          text: "Borrar",
          onPress: () => {
            BorrarPokemon(item.PokemonId)
          },
        },
      ],
      { cancelable: true }
    );
  }

  return (

    <View style={styles.contain}
      onLayout={({ nativeEvent }) => handleHeight(nativeEvent)}>
      <FlatList
        style={styles.flatListStyle}
        data={pokemones}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        snapToInterval={heightScreen}
        maxToRenderPerBatch={2}
        snapToAlignment={'start'}
        decelerationRate={'fast'}
        ListEmptyComponent={renderEmptyComponent}
      />
      <Modal
        backdropColor="black"
        isVisible={visible}
        style={styles.modal}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.nameView}>
            <Text text30 style={styles.nameStyle}>{name}</Text>
          </View>
          <View style={styles.typesStyle}>
            <View style={styles.titleDescViewStyle}>
              <Text text60>Types</Text>
            </View>
            <FlatList
              style={styles.flatListStyle}
              data={types}
              keyExtractor={keyExtractorType}
              renderItem={renderItemType}
            />
          </View>
          <View style={styles.movesStyle}>
            <View style={styles.titleDescViewStyle}>
              <Text text60>Moves</Text>
            </View>
            <FlatList
              style={styles.flatListStyle}
              data={moves}
              keyExtractor={keyExtractorMove}
              renderItem={renderItemMove}
            />
          </View>
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButtonView}>
            <Ionicon name='close' color={colorTercero} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Spinner isLoading={isLoading} />
    </View>

  );

  async function BorrarPokemon(PokemonId){
    setLoading(true)
    await deletePromise(PokemonId)
    setLoading(false)
    loadPokemons()
  }

  async function loadDetallePokemon(name) {
    setLoading(true)
    const detalle = await getDetallePokemon(name)
    const moves = detalle.moves
    const types = detalle.types
    setName(name)
    setMoves(moves.slice(-5))
    setTypes(types)
    setVisible(true)
    setLoading(false)
  }

  async function loadPokemons() {
    setLoading(true)
    const arrayPokemones = await promise1()
    const arrayTypes = await promise2()
    const arrayMoves = await promise3()
    const arrayFull = arrayPokemones.map((itemPokemon) => {
      let obj = {
        PokemonId: itemPokemon.PokemonId,
        name: itemPokemon.name
      }
      arrayTypes.forEach((itemType) => {
        if (itemType.PokemonId == itemPokemon.PokemonId) {
          obj.type = itemType
        }
      })

      let array = []
      arrayMoves.forEach((itemMove) => {
        if (itemMove.PokemonId == itemPokemon.PokemonId) {
          array.push(itemMove)
        }
      })
      obj.moves = array

      return obj
    })
    setPokemones(arrayFull)
    setLoading(false)
  }

  function promise1() {
    return new Promise((resolve, reject) => {
      //Pokemones
      db.transaction(function (txn) {
        const sql2 = `SELECT * FROM Pokemones`
        txn.executeSql(sql2, [], (tx, results) => {
          var len = results.rows.length;
          let array = []
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            obj = {
              PokemonId: row.PokemonId,
              name: row.name,
            }
            array.push(obj)
          }
          resolve(array)
        });
      })
    })
  }

  function promise2() {
    return new Promise((resolve, reject) => {
      //Pokemones
      db.transaction(function (txn) {
        const sql2 = `SELECT * FROM Types`
        txn.executeSql(sql2, [], (tx, results) => {
          var len = results.rows.length;
          let array = []
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            obj = {
              TypeId: row.TypeId,
              PokemonId: row.PokemonId,
              name: row.name,
            }
            array.push(obj)
          }
          resolve(array)
        });
      })
    })
  }

  function promise3() {
    return new Promise((resolve, reject) => {
      //Pokemones
      db.transaction(function (txn) {
        const sql2 = `SELECT * FROM Moves`
        txn.executeSql(sql2, [], (tx, results) => {
          var len = results.rows.length;
          let array = []
          for (let i = 0; i < len; i++) {
            let row = results.rows.item(i);
            obj = {
              MoveId: row.MoveId,
              PokemonId: row.PokemonId,
              name: row.name,
            }
            array.push(obj)
          }
          resolve(array)
        });
      })
    })
  }


  function deletePromise(PokemonId){
    return new Promise((resolve, reject) => {
      db.transaction(function (txn) {
        let sql = `DELETE FROM Pokemones WHERE PokemonId = "${PokemonId}"`
        txn.executeSql(sql,[],(tx, results) => {

        })
      })
      db.transaction(function (txn) {
        let sql = `DELETE FROM Types WHERE PokemonId = "${PokemonId}"`
        txn.executeSql(sql,[],(tx, results) => {

        })
      })
      db.transaction(function (txn) {
        let sql = `DELETE FROM Moves WHERE PokemonId = "${PokemonId}"`
        txn.executeSql(sql,[],(tx, results) => {

        })
      })
      db.transaction(function (txn) {
        const sql = `SELECT * FROM Pokemones`
        txn.executeSql(sql, [], (tx, results) => {
          pokemonCounter.update(results.rows.length)
          resolve()
        });
      })
      resolve()
    })
  }



}


const styles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  containEmpty: {
    justifyContent:'center',
    alignItems:'center',
    padding:50
  },
  flatListStyle: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    flex: 1
  },
  cajaView: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: colorSecundario,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  deleteViewButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    left: SAFE_AREA_PADDING.paddingLeft
  },
  detalleViewButton: {
    position: 'absolute',
    bottom: SAFE_AREA_PADDING.paddingBottom,
    right: SAFE_AREA_PADDING.paddingRight
  },
  modal: {
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    borderRadius: 16,
    justifyContent: "center",
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#fdfdfd",
    height: SCREEN_HEIGHT * 0.8
  },
  closeButtonView: {
    position: 'absolute',
    top: SAFE_AREA_PADDING.paddingTop,
    right: SAFE_AREA_PADDING.paddingRight
  },
  nameView: {
    flex: .1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nameStyle: {
    color: colorPrimario
  },
  titleDescViewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  typesStyle: {
    flex: .3
  },
  movesStyle: {
    flex: .4
  },
})
