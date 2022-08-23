import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text } from 'react-native-ui-lib';
import { SAFE_AREA_PADDING, storage } from '../../utils/constants';
import { colorCuarto, colorPrimario, colorSecundario, colorTercero } from '../../utils/designSystem';
import dateFormat from '../../utils/functions';
import Ionicon from 'react-native-vector-icons/Ionicons'

export default function MyProfileScreen() {
  const navigation = useNavigation();
  const [usu_imagen, setUsuImagen] = useState('')
  const [usu_nombre, setUsuNombre] = useState('')
  const [usu_fecha, setUsuFecha] = useState('')

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      _loadUsuInformation()
    });
    return unsubscribe;
  }, [navigation]);

  function _loadUsuInformation() {
    const jsonUser = storage.getString('user')
    if (jsonUser != undefined) {
      const userObject = JSON.parse(jsonUser)
      const usu_nombre = userObject.usu_nombre
      const usu_apellidoP = userObject.usu_apellido_paterno
      const usu_apellidoM = userObject.usu_apellido_materno
      const usu_imagen = userObject.usu_imagen
      const usu_fecha = userObject.usu_fecha_nacimiento

      console.log(usu_fecha)

      setUsuImagen(usu_imagen)
      setUsuNombre(usu_nombre + ' ' + usu_apellidoP + ' ' + usu_apellidoM)
      setUsuFecha(usu_fecha)
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.informationView}>
        <View style={styles.cajaInfoView}>
          {
            usu_imagen != ''
              ?
              <Avatar size={150} source={{ uri: usu_imagen }} />
              :
              <Ionicon name='person-circle' size={150} color={colorCuarto} />

          }
        </View>
        <View style={styles.cajaInfoView}>
          <Text text70>Nombre</Text>
          <Text style={{ color: usu_nombre == '' ? colorCuarto : colorTercero }} text60>{usu_nombre == '' ? 'Sin definir' : usu_nombre}</Text>
        </View>
        <View style={styles.cajaInfoView}>
          <Text text70>Fecha de nacimiento</Text>
          <Text style={{ color: usu_fecha == '' ? colorCuarto : colorTercero }} text60>{usu_fecha == '' ? 'Sin definir' : dateFormat(new Date(usu_fecha), 'dd-MM-yyyy')}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: SAFE_AREA_PADDING.paddingTop,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom,
    paddingLeft: SAFE_AREA_PADDING.paddingLeft,
    paddingRight: SAFE_AREA_PADDING.paddingRight,
    backgroundColor: colorSecundario,
    justifyContent: 'center',
  },
  informationView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  cajaInfoView: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },

});

