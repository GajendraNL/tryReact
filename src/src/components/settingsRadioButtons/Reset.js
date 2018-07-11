import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { CardSection, } from '../common';
import { settingsForPlanets, settingsForLongitude, settingCharts, settingsForTheme } from '../../actions';
import { scale } from '../common/scaling';

const { width, height } = Dimensions.get('window');

//const backgroundColor = '#0067a7';

const reset_props = [
    { label: 'Default  ', value: 0 },
    { label: 'Setting  ', value: 1 }
];

class Reset extends Component {

    resetSettings() {
        this.props.settingsForPlanets(0);
        this.props.settingsForLongitude(0);
        this.props.settingCharts(0);
        this.props.settingsForTheme(0);
        this.props.navigationProps.navigate('Home');
    }

    render() {
        return (
          <CardSection>
            <View style={styles.viewStyle}>
              <TouchableOpacity
                style={styles.btn}
                onPress={this.resetSettings.bind(this)}
              >
              <Text style={{ color: '#ffffff', fontFamily: 'Tittilium Web' }}>Reset To Default </Text>
              </TouchableOpacity>
            </View>
          </CardSection>
        );
    }
}

const styles = {
    viewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'

    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,

    },
    textview: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    buttonStyle: {
        // marginLeft: 190,
        // marginRight:10,
        // paddingBottom: 10,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'

    },
    btn: {
        backgroundColor: '#AD1457',
        borderRadius: 3,
        borderWidth: 0,
        // marginLeft: 5,
        // marginRight: 5,
        // marginTop: 10,
        // justifyContent:'flex-end',
        // alignItems:'flex-end',
        paddingTop: scale(5),
        paddingBottom: scale(5),
        paddingLeft: scale(10),
        paddingRight: scale(10),
        borderColor: '#757575',
        shadowColor: '#757575',
        shadowOffset: { width: 0, height: -5 },
        shadowRadius: 1,
        shadowOpacity: 0.3
    }

};

const mapDispatchToProps = (dispatch) => {
    return {
        settingsForPlanets: data => dispatch(settingsForPlanets(data)),
        settingsForLongitude: data => dispatch(settingsForLongitude(data)),
        settingCharts: data => dispatch(settingCharts(data)),
        settingsForTheme: data => dispatch(settingsForTheme(data))
    };
};

const mapStateToProps = ({ themeSetting }) => {
    return { themeSetting };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reset);
