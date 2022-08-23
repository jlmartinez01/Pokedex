import { Dimensions, Platform } from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import { MMKV } from 'react-native-mmkv'
import { openDatabase } from 'react-native-sqlite-storage';
export const RutaPrincipal = "https://pokeapi.co/api/v2/";

export const storage = new MMKV()

export const db = openDatabase({ name: 'PokedexDatabase.db' });

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM =
  Platform.select({
    ios: StaticSafeAreaInsets.safeAreaInsetsBottom,
  }) ?? 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: StaticSafeAreaInsets.safeAreaInsetsLeft + CONTENT_SPACING,
  paddingTop: StaticSafeAreaInsets.safeAreaInsetsTop + CONTENT_SPACING,
  paddingRight: StaticSafeAreaInsets.safeAreaInsetsRight + CONTENT_SPACING,
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// Animación forFade en navegación
export const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Platform.android? Dimensions.get('screen').height - StaticSafeAreaInsets.safeAreaInsetsBottom:Dimensions.get('window').height