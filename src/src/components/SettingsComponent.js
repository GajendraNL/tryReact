import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import { NewCard } from './common';
import Theme from './settingsRadioButtons/Theme';
import Planets from './settingsRadioButtons/Planets';
import Longitude from './settingsRadioButtons/Longitude';
import Chart from './settingsRadioButtons/Chart';
import Reset from './settingsRadioButtons/Reset';
import Ayanamasa from './settingsRadioButtons/Ayanamasa';
// import { scale, moderateScale, verticalScale} from '../common/scaling';

const { width, height } = Dimensions.get('window');
//const backgroundColor = '#0067a7';

class SettingsComponent extends React.Component{

    static navigationOptions = ({ navigation }) => {
        const drawerLabel = 'Settings';
        const drawerIcon = () => (
            <Image
              source={require('../../images/settings.png') }
              style={{ width: 26, height:26 }}
            />
        );
        return { drawerLabel, drawerIcon };
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: this.props.themeSetting.astroListbg }}>
              <HeaderComponent {...this.props} />
              <View>
                <View>
                  <NewCard>
                    <Longitude />
                  </NewCard>
                </View>
                <NewCard>
                  <Planets />
                </NewCard>
                <NewCard>
                  <Chart />
                </NewCard>
                <NewCard>
                  <Theme />
                </NewCard>
                <NewCard>
                  <Ayanamasa />
                    </NewCard>
                </View>
                <View style={styles.resetStyle}>
                    <NewCard>
                        <Reset navigationProps={this.props.navigation} />
                    </NewCard>
                </View>
            </View>
        );
    }
}

const styles = {
    resetStyle: {
        position: 'absolute',
        bottom: 0,
        left: 0
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: scale(220)
    },
};

const mapStateToProps = ({ themeSetting }) => {
    return { themeSetting };
};

export default connect(mapStateToProps)(SettingsComponent);
