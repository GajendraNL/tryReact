import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-checkbox';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { CardSection } from './common';
import Card_R from './common/Card_R';
import { scale } from './common/scaling';

class BasicDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = { chartData: null,
                  rasiOrPlanet: false,
                  Details0: false,
                  Details1: false,
                  Details3: false,
                  Details5: false,
                  Details2: false,
                  Details4: false,
                  Details6: false,
                  Details7: false,
                  Details8: false,
                };
  }

  getPlanetProps(i) {
    const { border, textStyle } = styles;
    const { textColor } = this.props.themeSetting;
    return (
      <View style={styles.viewStyle2}>
          <Grid>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]} >Planet</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border} >
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].planet}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Vishnu Avathar</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].VishnuAvathar}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Amsa</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Amsa}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Nature</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Nature}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Governance</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Governance}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Colors</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Colors}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Gem Stone</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].GemStone}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Metal</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Metal}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Relationships</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Relationships}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Cabinet</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Cabinet}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Direction</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Direction}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Dieties</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Dieties}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>Sex</Text>
                  </Col>
                  <Col size={5} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Sex}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>Element</Text>
                  </Col>
                  <Col size={5} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Element}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>Varnas</Text>
                  </Col>
                  <Col size={5} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Varnas}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Doshas</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Doshas}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Vegetation</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Vegetation}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Gunas</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text></Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Gunas}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Dwelling Places</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].DwellingPlaces}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Time Periods</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].TimePeriods}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>Tastes</Text>
                  </Col>
                  <Col size={5} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Tastes}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>Strengths</Text>
                  </Col>
                  <Col size={5} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Strengths}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>Ritus</Text>
                  </Col>
                  <Col size={5} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Ritus}</Text>
                  </Col>
              </Row>
              <Row>
                  <Col size={30} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>Existenc</Text>
                  </Col>
                  <Col size={5} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>:</Text>
                  </Col>
                  <Col size={60} style={styles.border}>
                      <Text style={[textStyle, { color: textColor }]}>{this.props.planetInfo[i].Existence}</Text>
                  </Col>
              </Row>
          </Grid>
      </View>
    );
  }

  getMoreDetails(i) {
    if (this.state.Details0 && i === 0) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details1 && i === 1) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details3 && i === 3) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details5 && i === 5) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details2 && i === 2) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details4 && i === 4) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details6 && i === 6) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details7 && i === 7) return <View>{this.getPlanetProps(i)}</View>;
    if (this.state.Details8 && i === 8) return <View>{this.getPlanetProps(i)}</View>;
  }

  getDetails(i) {
    const icons = [require('../../images/sun_1.png'),
                  require('../../images/moon_1.png'),
                  require('../../images/mars_1.png'),
                  require('../../images/mercury_1.png'),
                  require('../../images/juniper.png'),
                  require('../../images/venus_1.png'),
                  require('../../images/saturn_1.png'),
                  require('../../images/rahu_1.png'),
                  require('../../images/ketu_2.png'),
                ];
    const iconsNight = [require('../../images/sun_n.png'),
                  require('../../images/moon_n.png'),
                  require('../../images/mars_n.png'),
                  require('../../images/mercury_n.png'),
                  require('../../images/juniper_n.png'),
                  require('../../images/venus_n.png'),
                  require('../../images/saturn_n.png'),
                  require('../../images/rahu_n.png'),
                  require('../../images/ketu_n.png'),
                ];
    const planets = this.props.chartData.todayData.planets;
    const icon = this.props.themeSetting.theme_state === 0 ? icons[i] : iconsNight[i];
    const planetName = planets[i].name;
    const planetDMS = `${planets[i].dms.substr(0, 11)}"`;
    const planetDecimal = planets[i].decimal.toFixed(2);
    const isDegree = this.props.settings.longitudeRepresentation === 0;
    const planetValue = isDegree ? planetDMS : planetDecimal;
    const rasiNumber = parseInt(planets[i].decimal / 30, 10);
    const rasiList = { 0: 'Ar', 1: 'Ta', 2: 'Ge', 3: 'Cn', 4: 'Le', 5: 'Vi',
                      6: 'Li', 7: 'Sc', 8: 'Sg', 9: 'Cp', 10: 'Aq', 11: 'Pi' };
    const rasi = rasiList[rasiNumber];
    const planetDegree = parseInt(planetDMS.substr(0, 3), 10) % 30;
    const planetMinute = planetDMS.substr(5, 2);
    const Nakshatra = planets[i].nakshatra;
    const rasiPlacement = `${planetDegree}${rasi}${planetMinute}`;
    const displayRasiOrPlanet = this.state.rasiOrPlanet ? planetValue : rasiPlacement;

    return (
      <View style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 1 }}>
      <Row>
        <Col size={2} style={styles.border}>
          <Image
            style={styles.ImageIconStyle}
            source={icon}
          />
        </Col>
        <Col size={1} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor, fontSize: scale(10) }]}>
            ▼
          </Text>
        </Col>
        <Col size={2} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            {planetName.substr(0, 2)}
          </Text>
        </Col>
        <Col size={5} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            {displayRasiOrPlanet}
          </Text>
        </Col>
        <Col size={6} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            {Nakshatra}
          </Text>
        </Col>
        </Row>
        {this.getMoreDetails(i)}
      </View>
    );
  }

  getAyanamasaDetails() {
    const ascendantDMS = `${this.props.chartData.todayData.lagna.dms.substr(0, 11)}"`;
    const ascendantDecimal = this.props.chartData.todayData.lagna.decimal.toFixed(2);
    const isDegree = this.props.settings.longitudeRepresentation === 0;
    const ascendantValue = isDegree ? ascendantDMS : ascendantDecimal;
    const rasiNumber = parseInt(ascendantDecimal / 30, 10);
    const rasiList = { 0: 'Ar', 1: 'Ta', 2: 'Ge', 3: 'Cn', 4: 'Le', 5: 'Vi',
                      6: 'Li', 7: 'Sc', 8: 'Sg', 9: 'Cp', 10: 'Aq', 11: 'Pi' };
    const rasi = rasiList[rasiNumber];
    const planetDegree = parseInt(ascendantDMS.substr(0, 3), 10) % 30;
    const planetMinute = ascendantDMS.substr(5, 2);
    const rasiPlacement = `${planetDegree}${rasi}${planetMinute}`;
    const displayRasiOrPlanet = this.state.rasiOrPlanet ? ascendantValue : rasiPlacement;
    const icon = this.props.themeSetting.theme_state === 0 ? require('../../images/asc.png') : require('../../images/asc_n.png');
    return (
      <Row style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 1 }}>
        <Col size={3} style={styles.border}>
          <Image
            source={icon}
            style={styles.ImageIconStyle}
          />
        </Col>
        <Col size={2} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            As
          </Text>
        </Col>
        <Col size={5} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            {displayRasiOrPlanet}
          </Text>
        </Col>
        <Col size={6} style={styles.border}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            {this.props.chartData.todayData.extras.nakshatra.string}
          </Text>
        </Col>
      </Row>
    );
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
      <View style={styles.viewStyle}>
        <Grid>
        <Row style={{ borderBottomColor: '#BDBDBD', borderBottomWidth: 1 }}>
            <Col size={5} style={styles.border} >
              <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
                Planet
              </Text>
            </Col>
            <Col size={5} style={styles.border}>
            <CheckBox
              label='Position'
              labelStyle={[styles.textStyle, { color: this.props.themeSetting.textColor, paddingLeft: 0, }]}
              checkboxStyle={{ height: 20, width: 20, }}
              onChange={(checked) => this.setState({ rasiOrPlanet: checked })}
            />
            </Col>
            <Col size={6} style={styles.border}>
              <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
                Lord
              </Text>
            </Col>
          </Row>
          {this.getAyanamasaDetails()}
          <TouchableOpacity onPress={() => this.setState({ Details0: !this.state.Details0 })}>
            {this.getDetails(0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details1: !this.state.Details1 })}>
            {this.getDetails(1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details3: !this.state.Details3 })}>
            {this.getDetails(3)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details5: !this.state.Details5 })}>
            {this.getDetails(5)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details2: !this.state.Details2 })}>
            {this.getDetails(2)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details4: !this.state.Details4 })}>
            {this.getDetails(4)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details6: !this.state.Details6 })}>
            {this.getDetails(6)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details7: !this.state.Details7 })}>
            {this.getDetails(7)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({ Details8: !this.state.Details8 })}>
            {this.getDetails(8)}
          </TouchableOpacity>
        </Grid>
      </View>
    );
  }


  render() {
    // TODO: Show The date/time and basic planetary ephemeris
    return (
      <Card_R title='Planetary Information' expanded collapsable >
        <CardSection >
          <View style={styles.thumbNailContainerStyle}>
            {this.renderChartData()}
          </View>
        </CardSection>
      </Card_R>
    );
  }
}

const styles = StyleSheet.create({
  thumbNailContainerStyle: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },
  ImageIconStyle: {
    padding: 2,
    margin: 2,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  textStyle: {
    justifyContent: 'center',
    paddingTop: scale(2),
    paddingLeft: scale(5),
    fontSize: scale(14)
  },
  viewStyle: {
    flex: 1,
    paddingLeft: scale(10)
    //backgroundColor: '#F0FFFF'
  },
  viewStyle2: {
    flex: 1,
    paddingLeft: scale(20),
  },
  border: {
    paddingBottom: scale(1),
  },
  imgTxtStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomColor: 'black',
    borderBottomWidth: scale(1),
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
  }
});

const mapStateToProps = ({ refreshChart, settings, themeSetting, planetInfo }) => {
    if (refreshChart && refreshChart.chartData) {
        return { chartData: refreshChart.chartData, settings, themeSetting, planetInfo };
    }
    return { chartData: null };
};

export default connect(mapStateToProps, null)(BasicDetailsCard);
