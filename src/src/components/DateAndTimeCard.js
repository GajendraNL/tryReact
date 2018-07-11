import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { NewCard } from './common';
import { scale } from './common/scaling';

const { width, height } = Dimensions.get('window');


class DateAndTimeCard extends Component {

    constructor(props) {
        super(props);
        this.state = { chartData: null };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('CDU', prevProps, this.props, prevState);
    }

    renderChartData() {
        if (!this.props.chartData) {
            return (
                <ActivityIndicator
                    animating
                    style={styles.indicator}
                    size="large"
                    color='#EF6C00'
                />
            );
        }

        return (
            <View style={[styles.viewStyle, { backgroundColor: this.props.themeSetting.card_bg }]}>
                <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
                    {this.props.chartData.todayData.dateInfo.dateformatted}
                </Text>
                <Text style={[styles.time, { color: this.props.themeSetting.textColor }]}>
                    {this.props.chartData.todayData.dateInfo.timeWithZone}
                </Text>
            </View>
        );
    }

    render() {
        // TODO: Show The date/time and basic planetary ephemeris
        return (
            <NewCard title='Date' expanded >
                <View style={styles.thumbNailContainerStyle}>
                    {this.renderChartData()}
                </View>
            </NewCard>
        );
    }
}

const styles = StyleSheet.create({
    thumbNailContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        // width:'100%',
    },
    textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        width: '75%'
    },
    time: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        width: '25%'
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
    table: { width: scale(360), flexDirection: 'row' },
    head: { height: scale(40) },
    headText: { color: '#fff', textAlign: 'center' },
    titleText: { marginLeft: 6 },
    list: { height: scale(28) },
    listText: { textAlign: 'right', marginRight: 6 }
});

const mapStateToProps = ({ refreshChart, themeSetting }) => {
        return { chartData: refreshChart.chartData, themeSetting };
};

export default connect(mapStateToProps, null)(DateAndTimeCard);
