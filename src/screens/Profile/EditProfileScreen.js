import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Text, Button } from 'react-native-ui-lib';
import { SAFE_AREA_PADDING, storage } from '../../utils/constants';
import { colorCuarto, colorPrimario, colorQuinto, colorSecundario, colorTercero } from '../../utils/designSystem';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { TextField } from 'react-native-ui-lib/src/incubator';
import { DateTimePicker } from 'react-native-ui-lib/src/components/dateTimePicker';
import { showMessage } from 'react-native-flash-message';
import dateFormat from '../../utils/functions';
import {launchCamera} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import Spinner from '../../components/Spinner';

export default function EditProfileScreen() {
    const navigation = useNavigation();
    const [isLoading, setLoading] = useState(false)
    const [usu_imagen, setUsuImagen] = useState('')
    const [usu_nombre, setUsuNombre] = useState('')
    const [usu_apellidoP, setUsuApellidoP] = useState('')
    const [usu_apellidoM, setUsuApellidoM] = useState('')
    const [usu_fecha, setUsuFecha] = useState('')

    const refInput = useRef(TextField);
    const refInput2 = useRef(TextField);
    const refInput3 = useRef(TextField);



    useEffect(() => {
        _loadUsuInformation()
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

            setUsuImagen(usu_imagen)
            setUsuNombre(usu_nombre)
            setUsuApellidoP(usu_apellidoP)
            setUsuApellidoM(usu_apellidoM)
            setUsuFecha(usu_fecha)
        }
    }


    const getCustomInputValue = (value) => {
        if (!value) {
            return 'Introduce tu fecha de nacimiento';
        }
        return dateFormat(new Date(value), 'dd-MM-yyyy')
    };

    const renderCustomInput = ({ value }) => {
        return (
            <View>
                <Text absR textPrimary text80BO>
                    {getCustomInputValue(value)}
                </Text>
            </View>
        );
    };

    const handleFecha = (text) => {
        fecha = text.toISOString().split('T')[0]
        setUsuFecha(fecha)
    }

    const handlerGuardarInfo = () => {
        setLoading(true);
        let user = {
            usu_nombre: usu_nombre.trim(),
            usu_apellido_paterno: usu_apellidoP.trim(),
            usu_apellido_materno: usu_apellidoM.trim(),
            usu_fecha_nacimiento: usu_fecha.toString(),
            usu_imagen: usu_imagen.toString(),
        }

        storage.set('user', JSON.stringify(user))

        showMessage({
            message: "Información guardada correctamente",
            backgroundColor: colorQuinto
        });
        navigation.goBack()
        setLoading(false);
    }

    const handlerOpenCamera = () => {
        setLoading(true)
        const options={
          mediaType:'photo',
          quality:1
        }
    
        launchCamera(options,(response) => {
          if (response.didCancel) {
            setLoading(false)
          } else if (response.error) {
            showMessage({
                message:response.error,
                backgroundColor:'white',
                color:colorPrimario,
                type: "info",
              });
              setLoading(false)
          } else {
            const uri = (response.assets[0].uri)
            optimizeImage(uri)
          }
        });
    }

    const optimizeImage = (image) => {
        
    Image.getSize(image, (width, height) => {

        let compressFormat = 'JPEG';
        let quality = 100;
        let rotation = 0;
        let newWidth = 350;
        let newHeight = 350;
  
        ImageResizer.createResizedImage(
          image,
          newWidth,
          newHeight,
          compressFormat,
          quality,
          rotation,
          null,
        )
          .then((response) => {
            let uri = response.uri;
            console.log(response.size)
            const obj = {
              uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
              type: 'image/jepg',
              name: 'post.jpg',
            }
            setUsuImagen(obj.uri)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            showMessage({
                message:response.error,
                backgroundColor:'white',
                color:colorPrimario,
                type: "info",
              });
          });
      });
    }


    return (
        <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
            <View style={styles.scrollView}>
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContainer}
                    contentInsetAdjustmentBehavior="always"
                    overScrollMode="always"
                    showsVerticalScrollIndicator={false}
                    style={styles.scroll}>
                    <View style={styles.inner}>
                        <View style={styles.informationView}>
                            
                        <TouchableOpacity onPress={handlerOpenCamera} style={styles.cajaInfoView}>
                                {
                                    usu_imagen != ''
                                        ?
                                            <Avatar size={150} source={{ uri: usu_imagen }} />
                                        :
                                            <Ionicon name='person-circle' size={150} color={colorCuarto}/>
                                    
                                }
                                </TouchableOpacity>
                                <View style={styles.cajaInputView}>
                                    <Text text70>Nombre</Text>
                                    <TextField
                                        ref={refInput}
                                        value={usu_nombre}
                                        placeholder={'Ingresa tu nombre'}
                                        onChangeText={setUsuNombre}
                                        maxLength={30}
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => { refInput2.current.focus() }}
                                        blurOnSubmit={false}
                                        style={styles.text}
                                    />
                                </View>
                                <View style={styles.cajaInputView}>
                                    <Text text70>Apellido paterno</Text>
                                    <TextField
                                        ref={refInput2}
                                        value={usu_apellidoP}
                                        placeholder={'Ingresa tu apellido paterno'}
                                        onChangeText={setUsuApellidoP}
                                        maxLength={30}
                                        returnKeyType={'next'}
                                        onSubmitEditing={() => { refInput3.current.focus() }}
                                        blurOnSubmit={false}
                                        style={styles.text}
                                    />
                                </View>
                                <View style={styles.cajaInputView}>
                                    <Text text70>Apellido materno</Text>
                                    <TextField
                                        ref={refInput3}
                                        value={usu_apellidoM}
                                        placeholder={'Ingresa tu apellido materno'}
                                        onChangeText={setUsuApellidoM}
                                        maxLength={30}
                                        returnKeyType={'done'}
                                        style={styles.text}
                                    />
                                </View>
                                <View style={styles.cajaInfoView}>
                                    <Text text70>Fecha de nacimiento</Text>
                                    <DateTimePicker
                                        containerStyle={{ marginVertical: 20 }}
                                        placeholder={'Introduce tu fecha de nacimiento'}
                                        dateFormat={'MMMM D, YYYY'}
                                        renderInput={renderCustomInput}
                                        maximumDate={new Date()}
                                        onChange={handleFecha}
                                        value={(usu_fecha == '' || usu_fecha == undefined) ? null : new Date(usu_fecha)}
                                    />
                                </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.buttonView}>
                <Button label={'Guardar'} size={Button.sizes.medium} backgroundColor={colorPrimario} onPress={handlerGuardarInfo} />
            </View>
            <Spinner isLoading={isLoading}/>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: SAFE_AREA_PADDING.paddingLeft,
        paddingRight: SAFE_AREA_PADDING.paddingRight,
        backgroundColor: colorSecundario,
        justifyContent: 'center',
    },
    scroll: {
        alignSelf: 'stretch',
    },
    scrollView: {
        flex:.9,
        
    },
    scrollContainer: {
        alignSelf: 'stretch',
        flexGrow: 1,
    },
    informationView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cajaInputView: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: colorCuarto,
        borderBottomWidth: .2,
        width: '60%'
    },
    cajaInfoView: {
        marginVertical: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editarIconView: {
        position: 'absolute',
        top: SAFE_AREA_PADDING.paddingTop,
        right: SAFE_AREA_PADDING.paddingRight,
        backgroundColor: colorPrimario,
        borderRadius: 50,
        padding: 5
    },
    text: {
        textAlign: 'center',
        color: colorTercero,
    },
    buttonView: {
       flex:.1,
       alignItems:'center',
       justifyContent:'center'
    },

});

