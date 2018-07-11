import React, { Component } from 'react';
import { View, Image, } from 'react-native';
import HeaderComponent from './HeaderComponent';
import { HomeStack } from './HomeStack';
// import HomeScreen from './HomeScreen';

//const backgroundColor = '#0067a7';
class HomeComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        const drawerLabel = 'Home';
        const drawerIcon = () => (
            <Image
                source={require('../../images/home.png')}
                style={{ width: 25, height: 25 }}
            />
        );
        return { drawerLabel, drawerIcon };
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <HeaderComponent {...this.props} />
              <HomeStack />
            </View>
        );
    }
}

export { HomeComponent };
