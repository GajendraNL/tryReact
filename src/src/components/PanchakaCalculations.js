import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { connect } from 'react-redux';

class PanchakaCalculations extends Component {

  constructor(props) {
    super(props);
      this.state = { chartData: null };
    }

    //Find Rising Lagna i.e Zodiac
  findLagna(day, month) {
    if ((month === 1 && day <= 20) || (month === 12 && day >= 22)) {
      return 10;
    } else if ((month === 1 && day >= 21) || (month === 2 && day <= 18)) {
      return 11;
    } else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return 12;
    } else if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) {
      return 1;
    } else if ((month === 4 && day >= 21) || (month === 5 && day <= 20)) {
      return 2;
    } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return 3;
    } else if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) {
      return 4;
    } else if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) {
      return 5;
    } else if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) {
      return 6;
    } else if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) {
      return 7;
    } else if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) {
      return 8;
    } else if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) {
      return 9;
    }
  }

  renderChartData() {
    if (!this.props.chartData) {
      return (
        <View>
          <Text>No Data</Text>
        </View>
      );
    }
        //thithi
    let tithi = parseInt(this.props.chartData.todayData.extras.tithi.value);
    if (tithi > 15) {
      tithi -= 15;
    }
    //nakshatra
    const nakshatra = parseInt(this.props.chartData.todayData.extras.nakshatra.value);

    //weekday
    const weekday = this.props.chartData.todayData.dateInfo.weekday;
    const dayNumbers = { 'Sunday': 1,'Monday': 2, 'Tuesday': 3, 'Wednesday': 4, 'Thursday':5, 'Friday': 6, 'Saturday': 7 };
    const dayNumber = dayNumbers[weekday];

    //Rising Lagna
    const day = parseInt((this.props.chartData.todayData.dateInfo.date).substring(8));
    const month = parseInt((this.props.chartData.todayData.dateInfo.date).substring(5,7));
    const risingLagna = this.findLagna(day, month);

    //calculation of PanchakaMessage
    const result = ((tithi + nakshatra + dayNumber + risingLagna) % 9);

    let resultMessage = {0: 'Good', 1: 'Mrithyu Panchaka - Danger and to be avoided', 2: 'Agni Panchaka - Danger from fire',
                        3: 'Good', 4: 'Raja Panchaka - Evil/Bad Results', 5: 'Good', 6: 'Chora Panchaka - Evil Happenings',
                         7: 'Good', 8: 'Roga Panchaka - Bad results / Disease' };

    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ width: '35%', paddingLeft: 10, fontSize: 16, color: this.props.themeSetting.textColor }}>
          Panchaka
        </Text>
        <Text style={{ width: '00%', fontSize: 16, color: this.props.themeSetting.textColor }}>:</Text>
        <Text style={{ width: '65%', fontSize: 16, color: this.props.themeSetting.textColor }}>{resultMessage[result]}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.thumbNailContainerStyle}>
        {this.renderChartData()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    thumbNailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginRight: 10,
    },
    viewStyle: {
        flex: 1,
      //  backgroundColor: '#F0FFFF',
        alignItems: 'flex-start',
        justifyContent: 'center',
   }
});


const mapStateToProps = ({ refreshChart, themeSetting }) => {
    if (refreshChart && refreshChart.chartData) {
        return { chartData: refreshChart.chartData, themeSetting };
    }
    return { chartData: null };
};

export default connect(mapStateToProps, null)(PanchakaCalculations);
