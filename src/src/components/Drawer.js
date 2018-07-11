import React, { Component } from 'react';
import { View, Dimensions, Text, ImageBackground } from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { HomeComponent } from './HomeComponent';
import SettingsComponent from './SettingsComponent';
import AboutUs from './AboutUs';
import { ShowInfo } from './ShowInfo';


import { Home, Settings, InHouse, About , Planet , showData } from './screenNames';
// import { Drawer } from 'native-base';

var { height, width } = Dimensions.get('window');

const DrawerImage = (props) => (
    <View>
        <View>
            <ImageBackground
              style={{ height: 150, width: null, justifyContent: 'center', alignItems: 'center' }}
              source={require('../../images/bg.jpg')}
            >
                <Text style={{ color: '#ffffff', fontSize: 24 }}>Astro App</Text>
            </ImageBackground>
        </View>
        <View>
            <DrawerItems {...props} />
        </View>
    </View>
);

const AppDrawer = DrawerNavigator({
    Home: {
        path: '/',
        screen: HomeComponent,
    },
    showData: {
      path: '/ShowInfo',
      screen: ShowInfo
    },
    Settings: {
        path: '/Settings',
        screen: SettingsComponent,
    },
    AboutUs: {
        path: '/AboutUs',
        screen: AboutUs,
    },
},

{
    initialRouteName: 'Home',
    contentComponent: DrawerImage,
  // drawerOpenRoute:'DrawerOpen',
  // drawerCloseRoute:'DrrawerClose',
  // drawerToggleRoute:'DrawerToggle',
    drawerWidth: Dimensions.get('window').width * (0.6),
  //drawerBackgroundColor: '#FFCC80',
    contentOptions: {
     activeTintColor: 'red',
        style: {
            marginVertical: 50,
        }
    },
});

class Drawer extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, }}>
              <AppDrawer />
            </View>
        );
    }
}

export default Drawer;

// const mapStateToProps = ({ themeSetting }) => {
//      console.log("check settings data ",themeSetting);
//     return { themeSetting };
// };
//
// export default connect(mapStateToProps)(Drawer);
