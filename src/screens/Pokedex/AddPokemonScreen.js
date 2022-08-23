import React, { useCallback, useEffect, useState, useContext } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { db, SAFE_AREA_PADDING, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../utils/constants';
import { colorPrimario, colorQuinto, colorSecundario, colorTercero } from '../../utils/designSystem';
import { getDetallePokemon, getPokemons } from '../../utils/functions';
import { Text, Button } from 'react-native-ui-lib';
import Modal from "react-native-modal";
import Ionicon from 'react-native-vector-icons/Ionicons'
import Spinner from '../../components/Spinner';
import usePokemonCounter from '../../hooks/usePokemonCounter';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';

export default function AddPokemonScreen() {
  const navigation = useNavigation()
  const pokemonCounter = usePokemonCounter()
  const [isLoading, setLoading] = useState(false)
  const [pokemones, setPokemones] = useState([])
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState('')
  const [types, setTypes] = useState([])
  const [moves, setMoves] = useState([])
  const [firstType, setFirstType] = useState({})
  const [firstMove, setFirstMove] = useState({})
  const [lastMove, setLastMove] = useState({})

  useEffect(() => {
    loadPokemons()
  }, []);

  const handlerOpenModal = useCallback((item) => {
    loadDetallePokemon(item.name)
  }, [])


  const keyExtractor = useCallback((item) => item.name, [])
  const keyExtractorType = useCallback((item) => item.type.name, [])
  const keyExtractorMove = useCallback((item) => item.move.name, [])
  const renderItem = useCallback(({ item }) =>
  (
    <TouchableOpacity onPress={() => handlerOpenModal(item)} style={styles.cajaView}>
      <Text text50>{item.name}</Text>
    </TouchableOpacity>

  ), [])


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

  const handleAddPokemon = () =>{
    AddPokemon()
  }



  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.flatListStyle}
        data={pokemones}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
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
          <View style={styles.addButtonView}>
            <Button label={'Añadir'} size={Button.sizes.medium} backgroundColor={colorPrimario} onPress={handleAddPokemon} />
          </View>
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.closeButtonView}>
            <Ionicon name='close' color={colorTercero} size={30} />
          </TouchableOpacity>
        </View>
      </Modal>
      <Spinner isLoading={isLoading} />
    </SafeAreaView>
  );

  async function AddPokemon() {
    setLoading(true)
    const PokemonId = await promise1()
    await promise2(PokemonId)
    await promise3(PokemonId)
    await promise4(PokemonId)
    await promise5()
    setLoading(false)
    setVisible(false)
    navigation.navigate('PokedexScreen')
    showMessage({
      message: "Pokemon guardado correctamente",
      backgroundColor: colorQuinto
    });
  }

  function promise1() {
    return new Promise((resolve, reject) => {
      //Pokemones
      db.transaction(function (txn) {
        const sql = `Insert into Pokemones (name)VALUES("${name.toString()}");`
        txn.executeSql(sql, [], (tx, results) => {
          resolve(results.insertId)
        });

      })
    })
  }

  function promise2(PokemonId) {
    return new Promise((resolve, reject) => {
      //Types
      db.transaction(function (txn) {
        const sql = `Insert into Types (PokemonId,name)VALUES("${PokemonId.toString()}","${(firstType.name).toString()}");`
        txn.executeSql(sql, [], (tx, results) => {
          resolve()
        });

      })
    })
  }

  function promise3(PokemonId) {
    return new Promise((resolve, reject) => {
      //Moves
      db.transaction(function (txn) {
        const sql = `Insert into Moves (PokemonId,name)VALUES("${PokemonId.toString()}","${(firstMove.name).toString()}");`
        txn.executeSql(sql, [], (tx, results) => {
          resolve()
        });
      })
    })
  }

  function promise4(PokemonId) {
    return new Promise((resolve, reject) => {
      //Moves
      db.transaction(function (txn) {
        const sql = `Insert into Moves (PokemonId,name)VALUES("${PokemonId.toString()}","${(lastMove.name).toString()}");`
        txn.executeSql(sql, [], (tx, results) => {
          resolve()
        });
      })
    })
  }

  function promise5() {
    return new Promise((resolve, reject) => {
      //LoadPokemons
      db.transaction(function (txn) {
        const sql = `SELECT * FROM Pokemones`
        txn.executeSql(sql, [], (tx, results) => {
          pokemonCounter.update(results.rows.length)
          resolve()
        });
      })
    })
  }



  async function loadPokemons() {
    const pokemones = await getPokemons()
    setPokemones(pokemones)
  }

  async function loadDetallePokemon(name) {
    setLoading(true)
    const detalle = await getDetallePokemon(name)
    const moves = detalle.moves
    const types = detalle.types
    setName(name)
    setMoves(moves.slice(-5))
    setTypes(types)

    const obj1 = {
      name: moves[0].move.name
    }
    const obj2 = {
      name: moves[moves.length - 1].move.name
    }
    const obj3 = {
      name: types[0].type.name
    }

    setFirstMove(obj1)
    setLastMove(obj2)
    setFirstType(obj3)
    setVisible(true)
    setLoading(false)
  }


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorSecundario,
  },
  flatListStyle: {
    paddingHorizontal: SAFE_AREA_PADDING.paddingLeft,
    flex: 1
  },
  cajaView: {
    padding: 10,
    backgroundColor: colorSecundario,
    marginHorizontal: 5,
    marginVertical: 10,
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
  addButtonView: {
    flex: .1,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
