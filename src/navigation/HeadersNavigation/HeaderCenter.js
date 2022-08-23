import React from 'react';
import { Image, TouchableOpacity } from 'react-native';


export default function HeaderCenter({ onPress }) {

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 50 }}>
        
        
      </TouchableOpacity>
    );
  }