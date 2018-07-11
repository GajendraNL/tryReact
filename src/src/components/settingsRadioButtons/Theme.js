import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { CardSection } from '../common';
import { settingsForTheme } from '../../actions';
import { scale } from '../common/scaling';

const { width, height } = Dimensions.get('window');
//const backgroundColor = '#0067a7';

const theme_props = [
    { label: 'Day           ', value: 0 },
    { label: 'Night', value: 1 }
];

class Theme extends React.Component{

    onToggle(value) {
        this.props.settingsForTheme(value);
    }

    render() {
        return (
            <CardSection>
                <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>Theme         </Text>
                <RadioForm
                    buttonColor={'#000000'}
                    formHorizontal
                    animation
                    radio_props={theme_props}
                    color={this.props.themeSetting.textColor}
                    labelColor={this.props.themeSetting.textColor}
                    formHorizontal
                    initial={this.props.themeSetting.theme_state}
                    onPress={this.onToggle.bind(this)}
                />
            </CardSection>
        );
    }
}


const styles = {
    textStyle: {
        fontWeight: 'bold',
        fontSize: 18,
        width: scale(120),
    },
};

const mapDispatchToProps = (dispatch) => {
    return {
        settingsForTheme: data => dispatch(settingsForTheme(data))
    };
};

const mapStateToProps = ({ themeSetting }) => {
    return { themeSetting };
};

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
