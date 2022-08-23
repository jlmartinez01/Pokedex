import React from 'react';
import { StyleSheet,View,Image} from 'react-native';
import { SCREEN_HEIGHT } from '../../utils/constants';

export default function CounterScreen() {
  return (
    <View style={styles.contain}>
        <>
            <Image
            source={require('../../assets/img/pika.jpg')}
            style={{ flex: 1, position: 'absolute', height: SCREEN_HEIGHT, width: '100%' }}
            blurRadius={20}/>
                <Image
                        style={{ height: SCREEN_HEIGHT, width: '100%' }}
                        source={require('../../assets/img/pika.jpg')}
                        resizeMode={'contain'}
                    />
        </>
    </View>
  );
}


const styles = StyleSheet.create({
  contain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
