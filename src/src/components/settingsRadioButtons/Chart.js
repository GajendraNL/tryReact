import React, { Component } from 'react';
import { Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import RadioForm from 'react-native-simple-radio-button';
import { CardSection } from '../common';
import { settingCharts } from '../../actions';
import { scale, } from '../common/scaling';

const { width, height } = Dimensions.get('window');
//const backgroundColor = '#0067a7';

const chart_props = [
    { label: 'South       ', value: 0 },
    { label: 'North  ', value: 1 }
];

class Chart extends Component {
    onToggle(value) {
        this.props.settingCharts(value);
    }

    render() {
        return (
            <CardSection>
                <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>Chart           </Text>
                <RadioForm
                    buttonColor={this.props.themeSetting.textColor}
                    formHorizontal
                    animation
                    radio_props={chart_props}
                    labelColor={this.props.themeSetting.textColor}
                    color={this.props.themeSetting.textColor}
                    formHorizontal
                    initial={this.props.settings.charts_Type}
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
        settingCharts: data => dispatch(settingCharts(data))
    };
};

const mapStateToProps = ({ themeSetting, settings }) => {
    return { themeSetting, settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
