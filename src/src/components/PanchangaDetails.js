import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NewCard, } from './common';
import Card_R from './common/Card_R';
import PanchakaCalculations from './PanchakaCalculations';

class PanchangaDetails extends Component {

  getYogaMeaning() {
    let yogaMeaning = {"Vishkambha": "Door bolt/supporting pillar", "Preeti": "Love/affection", "Aayushmaan": "Long-lived",
           "Saubhaagya": "Long life of spouse (good fortune)", "Sobhana":"Splendid, bright", "Atiganda": "Great danger",
         "Sukarman": "One with good deeds", "Dhriti": "Firmness", "Shoola": "Shiva’s weapon of destruction (pain)",
           "Ganda": "Danger", "Vriddhi": "Growth", "Dhruva": "Fixed, constant", "Vyaaghaata": "Great blow", "Harshana": "Cheerful",
           "Vajra": "Diamond(strong)", "Siddhi": "Accomplishment", "Vyatipaata": "Great fall", "Variyan": "Chief/best",
         "Parigha": "Obstacle/hindrance", "Shiva":"Lord Shiva (purity)", "Siddha": "Accomplished/Ready",
           "Saadhya": "Possible", "Subha": "Auspicious", "Sukla":"White, bright", "Brahma": "Creator (good knowledge and purity)",
           "Indra": "Ruler of gods", "Vaidhriti": "A class of gods"
           };
    const yoga = this.props.chartData.todayData.extras.yoga.string;
    return yogaMeaning[yoga];
  }

  renderNakshatraDetails() {
    if (!this.props.nakshatra) {
      return (
        <View>
          <Text>No NakshatraDetails</Text>
        </View>
      );
    }
    for (var i = 0; i < 27; i++) {
      var nakshatraValue = this.props.chartData.todayData.extras.nakshatra.value
      if (nakshatraValue-1 === i) {
        const { Lord, Ruling_Diety } = this.props.nakshatra[i];
        return <Text> ({Lord} , {Ruling_Diety})</Text>;
      }
    }
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
    const longitudeDeg = this.props.settings.longitudeRepresentation === 0;
    const getAyanamasaValue = longitudeDeg ? (
      `${this.props.chartData.todayData.ayanamsa.dms.substr(0, 11)}"`
      ) : (
      this.props.chartData.todayData.ayanamsa.decimal.toFixed(2)
      );

//  deconstruction
    const { tithi, paksha, karana, nakshatra, yoga, lunarMonth } = this.props.chartData.todayData.extras;
    const { textColor } = this.props.themeSetting;
    const { moon, sun, AbhijitLagna, dayLength } = this.props.chartData.todayData;
    const sunrise = this.props.themeSetting.theme_state === 0 ? require('../../images/sunrise.png') : require('../../images/sunrise_n.png');
    const sunset = this.props.themeSetting.theme_state === 0 ? require('../../images/sunset.png') : require('../../images/sunset_n.png');
    const moonrise = this.props.themeSetting.theme_state === 0 ? require('../../images/moonrise.png') : require('../../images/moonrise_n.png');
    const moonset = this.props.themeSetting.theme_state === 0 ? require('../../images/moonset.png') : require('../../images/moonset_n.png');
    return (
      <Grid>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Tithi</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {lunarMonth.string} {paksha} {tithi.string} {tithi.left}
            </Text>
            <Text style={[styles.textStyle, { color: textColor }]}>
              Ends on {tithi.endTime}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Nakshatra</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {nakshatra.string}-{nakshatra.padum} {nakshatra.left} {this.renderNakshatraDetails()}
            </Text>
            <Text style={[styles.textStyle, { color: textColor }]}>
              Ends on {nakshatra.endTime}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Yoga</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {yoga.string}: {this.left} {this.getYogaMeaning()}
            </Text>
            <Text style={[styles.textStyle, { color: textColor }]}>
              Ends on {yoga.endTime}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Karana</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {karana.string} {karana.left}
            </Text>
            <Text style={[styles.textStyle, { color: textColor }]}>
              Ends on {karana.endTime}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Ayanamsa</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {getAyanamasaValue} {this.props.settings.ayanamsa_string}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Abhijan</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {AbhijitLagna}</Text>
          </Col>
        </Row>
        <Row>
          <Col size={30} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Day Length</Text>
          </Col>
          <Col size={0} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>:</Text>
          </Col>
          <Col size={70} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {dayLength.substr(0, 8)}
            </Text>
          </Col>
        </Row>
        <Row>
          <Col size={50} style={styles.panchakaStyle}>
            <PanchakaCalculations />
          </Col>
        </Row>
        <Row>
          <Col size={13} style={styles.border}>
            <Image
              source={sunrise}
              style={styles.ImageIconStyle}
            />
          </Col>
          <Col size={27} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Sun Rise</Text>
          </Col>
          <Col size={60} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {sun.sunrise.timeWithZone}</Text>
          </Col>
        </Row>
        <Row>
          <Col size={13} style={styles.border}>
            <Image
              source={sunset}
              style={styles.ImageIconStyle}
            />
          </Col>
          <Col size={27} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Sun Set</Text>
          </Col>
          <Col size={60} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {sun.sunset.timeWithZone}</Text>
          </Col>
        </Row>
        <Row>
          <Col size={13} style={styles.border}>
            <Image
              source={moonrise}
              style={styles.ImageIconStyle}
            />
          </Col>
          <Col size={27} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Moon Rise</Text>
          </Col>
          <Col size={60} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {moon.moonrise.timeWithZone}</Text>
          </Col>
        </Row>
        <Row>
          <Col size={13} style={styles.border}>
            <Image
              source={moonset}
              style={styles.ImageIconStyle}
            />
          </Col>
          <Col size={27} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>Moon Set</Text>
          </Col>
          <Col size={60} style={styles.border}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {moon.moonset.timeWithZone}</Text>
            </Col>
          </Row>
        </Grid>
      );
    }

  render() {
  // TODO: Show The date/time and basic planetary ephemeris
    return (
      <Card_R title='Panchanga Details' >
        <NewCard>
          <View style={styles.thumbNailContainerStyle}>
            {this.renderChartData()}
          </View>
        </NewCard>
      </Card_R>
    );
  }
}

const styles = StyleSheet.create({
    thumbNailContainerStyle: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
    },
    viewStyle: {
        flex: 1,
      //  backgroundColor: '#F0FFFF'
    },
    panchakaStyle: {
        paddingTop: 5,
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        paddingBottom: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    border: {
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    headerText: {
      //  backgroundColor : "#DAA520",
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.8,
        elevation: 2,
        position: 'relative',
    },
    textStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 5,
        paddingLeft: 10,
        // color: 'black',
        // fontFamily: 'Tittilium Web',
        fontSize: 16
     },
     sunriseStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        paddingBottom: 20,
        flex: 1,
        flexDirection: 'row',
    },
    ImageIconStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
    },
    indicator: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
     height: 80
    },
    table: { width: 360, flexDirection: 'row' },
    head: { height: 40 },
    headText: { color: '#fff', textAlign: 'center' },
    titleText: { marginLeft: 6 },
    list: { height: 28 },
    listText: { textAlign: 'right', marginRight: 6 }
});

const mapStateToProps = ({ refreshChart, nakshatraDetails, themeSetting, settings }) => {
    if (refreshChart && refreshChart.chartData) {
        return { chartData: refreshChart.chartData, nakshatra: nakshatraDetails, themeSetting, settings };
    }
    return { chartData: null, nakshatra: null };
};

export default connect(mapStateToProps, null)(PanchangaDetails);
