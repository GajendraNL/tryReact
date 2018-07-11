import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Table, Row, } from 'react-native-table-component';
import { NewCard, } from './common';
import Card_R from './common/Card_R';
import { scale } from './common/scaling';

class Tarabalam extends Component {
  constructor(props) {
    super(props);
    this.state = { chartData: null, nakshatraDetails: null };
  }

  getNakshatraList() {
    const Nakshatra = this.props.chartData.todayData.extras.nakshatra.string;
    const NakshatraArray = ['Aswini', 'Bharani', 'Krittika', 'Rohini', 'Mrigasira', 'Aardra', 'Punarvasu', 'Pushyami',
                            'Aasresha', 'Makha', 'Poorva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swaati',
                            'Visaakha', 'Anooraadha', 'Jyeshta', 'Moola', 'Poorvaashaadha', 'Uttaraashaadha', 'Sravanam',
                            'Dhanishtha', 'Satabhishak', 'Poorvaabhaadra', 'Uttaraabhaadra', 'Revati'
                          ];
    const index = NakshatraArray.indexOf(Nakshatra);
    const array1 = NakshatraArray.slice(index);
    const array2 = NakshatraArray.slice(0, index);
    const resultant = array1.concat(array2);
    return resultant;
  }

  getData() {
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
      <View>{this.tarabalam()}</View>
    );
  }

  tarabalam() {
    const { textColor, tarabalamRow1, tarabalamRow2, tarabalamHead } = this.props.themeSetting;
    const Nakshatra = this.getNakshatraList();
    const header = ['', 'Paryaya 1', 'Paryaya 2', 'Paryaya 3'];
    const Row1 = ['Janma', Nakshatra[0], Nakshatra[9], Nakshatra[18]];
    const Row2 = ['Sampat', Nakshatra[1], Nakshatra[10], Nakshatra[19]];
    const Row3 = ['Vipat', Nakshatra[2], Nakshatra[11], Nakshatra[20]];
    const Row4 = ['kshema', Nakshatra[3], Nakshatra[12], Nakshatra[21]];
    const Row5 = ['Pratyahari', Nakshatra[4], Nakshatra[13], Nakshatra[22]];
    const Row6 = ['Sadhaka', Nakshatra[5], Nakshatra[16], Nakshatra[23]];
    const Row7 = ['Vadha', Nakshatra[6], Nakshatra[15], Nakshatra[24]];
    const Row8 = ['Mitra', Nakshatra[7], Nakshatra[16], Nakshatra[25]];
    const Row9 = ['Parama Mitra', Nakshatra[8], Nakshatra[17], Nakshatra[26]];
    const widthArray = [scale(60), scale(93), scale(93), scale(93)];
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 2, borderColor: 'grey' }} >
          <Row
              data={header} widthArr={widthArray} style={{ backgroundColor: tarabalamHead, height: scale(30) }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row1} widthArr={widthArray} style={{ backgroundColor: tarabalamRow1 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row2} widthArr={widthArray} style={{ backgroundColor: tarabalamRow2 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row3} widthArr={widthArray} style={{ backgroundColor: tarabalamRow1 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row4} widthArr={widthArray} style={{ backgroundColor: tarabalamRow2 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row5} widthArr={widthArray} style={{ backgroundColor: tarabalamRow1 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row6} widthArr={widthArray} style={{ backgroundColor: tarabalamRow2 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row7} widthArr={widthArray} style={{ backgroundColor: tarabalamRow1 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row8} widthArr={widthArray} style={{ backgroundColor: tarabalamRow2 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
          <Row
              data={Row9} widthArr={widthArray} style={{ backgroundColor: tarabalamRow2 }}
              textStyle={{ color: textColor, textAlign: 'center' }}
          />
        </Table>
      </View>
    );
  }

  render() {
  // TODO: Show The date/time and basic planetary ephemeris
    return (
      <Card_R title='Tarabalam' >
        <NewCard>
          <View style={styles.thumbNailContainerStyle}>
            {this.getData()}
          </View>
        </NewCard>
      </Card_R>
    );
  }
}

const styles = StyleSheet.create({
    thumbNailContainerStyle: {
        marginLeft: scale(0),
        marginRight: scale(0),
        flex: 1,
    },
    container: { flex: 1, },
});

const mapStateToProps = ({ refreshChart, themeSetting }) => {
    if (refreshChart && refreshChart.chartData) {
        return { chartData: refreshChart.chartData, themeSetting };
    }
    return { chartData: null };
};

export default connect(mapStateToProps)(Tarabalam);
