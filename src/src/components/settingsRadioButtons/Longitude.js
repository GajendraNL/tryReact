import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { CardSection } from '../common';
import { settingsForLongitude } from '../../actions';
import { scale } from '../common/scaling';

const { width, height } = Dimensions.get('window');

//const backgroundColor = '#0067a7';

const longitude_props = [
    { label: 'Degree     ', value: 0 },
    { label: 'Decimal  ', value: 1 }
];

class Longitude extends Component {
    onToggle(value) {
        this.props.settingsForLongitude(value);
    }

    render() {
        return (
            <CardSection>
                <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>Longitude   </Text>
                <RadioForm
                    buttonColor={this.props.themeSetting.textColor}
                    formHorizontal
                    animation
                    radio_props={longitude_props}
                    labelColor={this.props.themeSetting.textColor}
                    color={this.props.themeSetting.textColor}
                    formHorizontal
                    initial={this.props.settings.longitudeRepresentation}
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
        settingsForLongitude: data => dispatch(settingsForLongitude(data))
    };
};

const mapStateToProps = ({ themeSetting, settings }) => {
    return { themeSetting, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Longitude);
