import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { CardSection } from '../common';
import { settingsForPlanets } from '../../actions';
import { scale } from '../common/scaling';

const { width, height } = Dimensions.get('window');
//const backgroundColor = '#0067a7';

const planets_props = [
    { label: 'Letters     ', value: 0 },
    { label: 'Symbol  ', value: 1 }
];

class Planets extends React.Component{
    onToggle(value) {
        this.props.settingsForPlanets(value);
    }

    render() {
        return (
            <CardSection>
                <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>Planets       </Text>
                <RadioForm
                    buttonColor={this.props.themeSetting.textColor}
                    formHorizontal
                    animation
                    radio_props={planets_props}
                    labelColor={this.props.themeSetting.textColor}
                    color={this.props.themeSetting.textColor}
                    formHorizontal
                    initial={this.props.settings.planetsRepresentation}
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
        settingsForPlanets: data => dispatch(settingsForPlanets(data))
    };
};

const mapStateToProps = ({ themeSetting, settings }) => {
    return { themeSetting, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Planets);
