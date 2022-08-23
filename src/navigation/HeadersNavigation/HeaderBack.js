import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { colorTercero } from '../../utils/designSystem';


export default function HeaderBack({ onPress }) {

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 50 }}>
        <Ionicon name='caret-back-outline' size={30} color={colorTercero}/>
      </TouchableOpacity>
    );
  }