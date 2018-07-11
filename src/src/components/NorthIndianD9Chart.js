import React, { Component } from 'react';
import { StyleSheet, Text, ImageBackground, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Switch from 'react-native-switch-pro';
import { Col, Row } from 'react-native-easy-grid';
import { CardSection } from './common';
import Card_R from './common/Card_R';
import { scale } from './common/scaling';

const { width, height } = Dimensions.get('window');

class NorthIndianD9Chart extends Component {

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
                <View>
                    <Text>No Data</Text>
                </View>
            );
        }
        const isDay = this.props.themeSetting.theme_state === 0;
        const link = isDay ? require('../../images/NG.png') : require('../../images/northIndianChart.png');
        return (
          <View>
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
              <ImageBackground source={link} style={styles.imageStyle}>

                  <View style={styles.layoutStyle}>
                      <View style={styles.firstRow}>
                          {this.getData(1)}
                      </View>
                      <View style={styles.firstRow}>
                          {this.getData(11)}
                      </View>
                  </View>

                  <View style={styles.layout2Style}>
                      <View style={styles.secondRow}>
                          {this.getData(2)}
                      </View>
                      <View style={styles.secondRow}>
                          {this.getData(0)}
                      </View>
                      <View style={styles.secondRow}>
                          {this.getData(10)}
                      </View>
                  </View>

                  <View style={styles.layoutStyle}>
                      <View style={styles.firstRow}>
                          {this.getData(3)}
                      </View>
                      <View style={styles.firstRow}>
                          {this.getData(9)}
                      </View>
                  </View>

                  <View style={styles.layout2Style}>
                      <View style={styles.secondRow}>
                          {this.getData(4)}
                      </View>
                      <View style={styles.secondRow}>
                          {this.getData(6)}
                      </View>
                      <View style={styles.secondRow}>
                          {this.getData(8)}
                      </View>
                  </View>

                  <View style={styles.layoutStyle}>
                      <View style={styles.firstRow}>
                          {this.getData(5)}
                      </View>
                      <View style={styles.firstRow}>
                          {this.getData(7)}
                      </View>
                  </View>

              </ImageBackground>
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
    imageStyle: {
        height: scale(330),
        width: scale(330),
        marginLeft: 3,
        marginRight: 3,
    },
    layoutStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    layout2Style: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    firstRow: {
        width: scale(66),
        height: scale(66),
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 3,
        marginTop: 1,
        margin: 0,
    },
    border: {
      borderBottomColor: '#BDBDBD',
      borderBottomWidth: 1,
      paddingBottom: 5,
      alignItems: 'center'
    },
    secondRow: {
        width: scale(44),
        height: scale(66),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginLeft: 3,
        marginTop: 1,
        margin: 0,
    },
    boxCorners: {
        width: scale(82),
        height: scale(82),
        backgroundColor: '#FFA533',
        justifyContent: 'center',
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
    PlanetColor: {
      color: 'blue',
      alignItems: 'center',
    },
    LagnaColor: {
      color: 'red',
      alignItems: 'center',
    },
    ArudaColor: {
      color: 'green',
    },
});


const mapStateToProps = ({ refreshChart, themeSetting, settings }) => {
    if (refreshChart !== null) {
        const { chartData, dateInfo } = refreshChart;

        return { chartData, dateInfo, themeSetting, settings };
    }
    return { chartData: null };
};

export default connect(mapStateToProps, null)(NorthIndianD9Chart);
