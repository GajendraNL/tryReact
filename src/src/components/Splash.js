import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ImageBackground,
    AsyncStorage
} from 'react-native';
import images from '../../images/raman.jpg';

class Splash extends Component {
    render(){
        return (
            <View style={styles.iconStyle}>
                <ImageBackground style={{justifyContent:'center',alignItems:'center',width: '100%', height: '100%' }}
                    source={require('../../images/bg.jpg')}
                    >
                    <Image
                        style={{borderRadius:50}}
                        source={images}/>
                        <Text style={styles.textStyle}>Astro App</Text>
                        <Text style={styles.webStyle}>www.rrrf.in</Text>
                </ImageBackground>
            </View>
        );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    picture: {
        height: DEVICE_HEIGHT,
        width:DEVICE_WIDTH
    },
    iconStyle:{
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    //    backgroundColor: '#000000'
    },
    textStyle:{
       color:'#FF9800',
        fontSize:26,
        textAlign:'center'
    },
    webStyle:{
        color:'#ffffff',
        fontSize:18,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
});

export default Splash;
