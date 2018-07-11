import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Switch from 'react-native-switch-pro';
import { Col, Row } from 'react-native-easy-grid';
import { CardSection } from './common';
import Card_R from './common/Card_R';
import { scale } from './common/scaling';

const { width, height } = Dimensions.get('window');

class SouthIndianDNineChart extends Component {
  constructor(props) {
    super(props);
    this.state = { chartData: null, displayPlanets: true, displayAruda: true, displayLagna: true };
  }

  getData(i) {
    const boxData = this.calcultePlanetsChart();
    const lagnaBox = this.lagnaChart();
    const arudaBox = this.arudaChart();
    const planetsData = this.state.displayPlanets ? <Text style={styles.PlanetColor}>{boxData[i]}</Text> : <Text />;
    const lagnaData = this.state.displayLagna ? <Text style={styles.LagnaColor}>{lagnaBox[i]}</Text> : <Text />;
    const arudaData = this.state.displayAruda ? <Text style={styles.ArudaColor}>{arudaBox[i]}</Text> : <Text />;
    return (
      <View >
        {planetsData}
        {lagnaData}
        {arudaData}
      </View>
    );
  }

  getBoxData(i) {
    const lagnaBox = this.lagnaChart();
    const thisBox = lagnaBox[i];
    let containsAS = false;
    if (thisBox !== null) {
      containsAS = thisBox.includes('AS');
    }
    if (containsAS && this.state.displayLagna) {
      return (
       <View style={[styles.boxCornersAS, { backgroundColor: this.props.themeSetting.chartsAS }]}>
        {this.getData(i)}
       </View>
     );
   }
     return (
      <View style={[styles.boxCornersAS, { backgroundColor: this.props.themeSetting.charts }]}>
       {this.getData(i)}
      </View>
    );
  }

  calcultePlanetsChart() {
    const boxData = new Array(12).fill(null);
    this.props.chartData.todayData.D9Table.planet.forEach((planet, i) => {
      const boxNumber = planet.box - 1;
      let leftOverDegrees = parseFloat(parseFloat(planet.decimal % 30).toFixed(2));
      if (this.props.settings.longitudeRepresentation === 0) {
        const degree = Math.floor(leftOverDegrees);
        const minute = Math.floor((leftOverDegrees - degree) * 60);
        leftOverDegrees = `${degree}°${minute}'`;
      }
      let pStr = `${planet.name.substr(0, 2)}`;
      if (planet.direction === 'R') {
        pStr = `(${planet.name.substr(0, 2)})`;
      }

      if (boxData[boxNumber] !== null) {
        boxData[boxNumber] += `\n${pStr}`;
      } else {
        boxData[boxNumber] = pStr;
      }
    });
    return boxData;
  }

  lagnaChart() {
    const boxD = new Array(12).fill(null);
    this.props.chartData.todayData.D9Table.lagna.forEach((lagnaDetail, i) => {
      const boxNum = lagnaDetail.box - 1;
      const lStr = lagnaDetail.name;
      if (boxD[boxNum] !== null) {
        boxD[boxNum] += `\t${lStr}`;
      } else {
        boxD[boxNum] = lStr;
      }
    });
    return boxD;
  }

  arudaChart() {
    const arudhaBox = new Array(12).fill(null);

    this.props.chartData.todayData.ArudaTable.forEach((arudaDetail, i) => {
      const boxNum = arudaDetail.box - 1;
      const arudhaHouse = arudaDetail.ArudhaHouseName;
      if (arudhaBox[boxNum] !== null) {
        arudhaBox[boxNum] += `\t${arudhaHouse}`;
      } else {
        arudhaBox[boxNum] = arudhaHouse;
      }
    });
    return arudhaBox;
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
      <View style={styles.container}>
        <Row>
          <Col size={1} style={styles.border} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: scale(14), color: this.props.themeSetting.textColor }}>Planets</Text>
              <Switch
                value={this.state.displayPlanets}
                onSyncPress={(value) => this.setState({ displayPlanets: value })}
              />
            </View>
          </Col>
          <Col size={1} style={styles.border} >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: scale(14), color: this.props.themeSetting.textColor }}>Aruda</Text>
              <Switch
                value={this.state.displayAruda}
                onSyncPress={(value) => this.setState({ displayAruda: value })}
              />
            </View>
          </Col>
          <Col size={1} style={styles.border} >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: scale(14), color: this.props.themeSetting.textColor }}>Lagna</Text>
              <Switch
                value={this.state.displayLagna}
                onSyncPress={(value) => this.setState({ displayLagna: value })}
              />
            </View>
          </Col>
        </Row>
        <View style={styles.layoutStyle}>
          {this.getBoxData(11)}
          {this.getBoxData(0)}
          {this.getBoxData(1)}
          {this.getBoxData(2)}
        </View>
        <View style={styles.layoutStyle}>
          {this.getBoxData(10)}
          <View style={[styles.boxCenter, { backgroundColor: this.props.themeSetting.astroListbg }]}>
            <Text style={{ fontSize: 20, color: this.props.themeSetting.textColor }}>
              NAVAMSA
            </Text>
            <Text style={{ color: this.props.themeSetting.textColor }}>D9</Text>
          </View>
          {this.getBoxData(3)}
        </View>
        <View style={styles.layoutStyle}>
        {this.getBoxData(9)}
          <View style={[styles.boxCenter, { backgroundColor: this.props.themeSetting.astroListbg }]}>
            <Text style={[styles.container, { color: this.props.themeSetting.textColor }]}>
              {this.props.chartData.todayData.extras.tithi.string}
            </Text>
            <Text style={[styles.container, { color: this.props.themeSetting.textColor }]}>
                    {this.props.chartData.todayData.extras.nakshatra.string}-{this.props.chartData.todayData.extras.nakshatra.padum}
            </Text>
            </View>
          {this.getBoxData(4)}
        </View>
        <View style={styles.layoutStyle}>
          {this.getBoxData(8)}
          {this.getBoxData(7)}
          {this.getBoxData(6)}
          {this.getBoxData(5)}
        </View>
      </View>
    );
  }

  render() {
    // TODO: Show The date/time and basic planetary ephemeris
    return (
      <Card_R title='Navamsa Chart (D9)' expanded >
        <CardSection>
          <View style={styles.thumbNailContainerStyle}>
            {this.renderChartData()}
          </View>
        </CardSection>
      </Card_R>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 5
  },
  layoutStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxCorners: {
    width: scale(82),
    height: scale(82),
    backgroundColor: '#FFA533',
    paddingLeft: 5,
    justifyContent: 'center',
    marginLeft: 1,
    marginTop: 1,
    margin: 0,
  },
  boxCornersAS: {
    width: scale(82),
    height: scale(82),
    backgroundColor: '#DCE775',
    justifyContent: 'center',
    paddingLeft: 5,
    marginLeft: 1,
    marginTop: 1,
    margin: 0,
  },
  boxCenter: {
    width: scale(164),
    height: scale(82),
    backgroundColor: '#33F3FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    margin: 0,
  },
  border: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    paddingBottom: 5,
    alignItems: 'center'
  },
  PlanetColor: {
    color: 'blue',
  },
  LagnaColor: {
    color: 'red',
  },
  ArudaColor: {
    color: 'green',
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
});

const mapStateToProps = ({ refreshChart, settings, themeSetting }) => {
  if (refreshChart !== null) {
    const { chartData, dateInfo } = refreshChart;
    return { chartData, dateInfo, settings, themeSetting };
  }
  return { chartData: null };
};

export default connect(mapStateToProps, null)(SouthIndianDNineChart);
