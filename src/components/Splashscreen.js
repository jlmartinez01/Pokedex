import AnimatedLottieView from "lottie-react-native";
import React, {useEffect} from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import {colorSecundario} from '../utils/designSystem';

export default function SplashScreen() {


  return (
    <View style={styles.container}>
      <StatusBar translucent barStyle='light-content' backgroundColor='transparent' />
      <AnimatedLottieView
          style={styles.pokebola}
          source={require("../assets/lottie/pokeball.json")}
          autoPlay={true}
          loop={true}
          resizeMode='contain'
          speed={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
    flex: 1, 
    backgroundColor: colorSecundario, 
    justifyContent: 'center',
    alignItems:'center' 
  },
  pokebola:{
    height:100,
    width:100
  }

});

