import React, { useState, useEffect } from 'react';
import { Text, TextInput } from 'react-native';
import Navigator from './src/navigation/Navigator';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import {colorSecundario} from './src/utils/designSystem';
import { PokemonProvider } from './src/context/PokemonContext';

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};



function AppContainer() {
  return (
    
    <PokemonProvider>
      <Navigator />
    </PokemonProvider>
  )
}

const ConnectedApp = connectActionSheet(AppContainer);

export default function App() {
  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1, backgroundColor:colorSecundario }}>
      <ActionSheetProvider>
        <ConnectedApp />
      </ActionSheetProvider>
    </SafeAreaView>
  );
}