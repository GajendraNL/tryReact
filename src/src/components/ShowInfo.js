import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions } from 'react-native';
import HeaderComponent from './HeaderComponent'
import ShowData from './ShowData';
// import { scale, moderateScale, verticalScale} from '../common/scaling';

const { width, height } = Dimensions.get('window');
//const backgroundColor = '#0067a7';

class ShowInfo extends Component {

    static navigationOptions = ({ navigation }) => {
        const drawerLabel = 'SavedInfo';
        const drawerIcon = () => (
            <Image
                source={require('../../images/info.png') }
                style={{ width: 26, height:26 }}
            />
        );
        return { drawerLabel, drawerIcon };
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', }}>
                <HeaderComponent {...this.props} />
                  <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
                      <ShowData navigationProps={this.props.navigation} />
                  </ScrollView>
            </View>
        );
    }
}

export { ShowInfo };
