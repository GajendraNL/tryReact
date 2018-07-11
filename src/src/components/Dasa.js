import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NewCard, } from './common';
import Card_R from './common/Card_R';
import { scale } from './common/scaling';
import SwissEphem from '../../SwissEphem';

class Dasa extends Component {
  constructor(props) {
    super(props);
    this.state = { dasha: null,
                  level: 1,
                  visibility: false,
                  antardasha: null,
                  antardasa: [],
                  pratyantardasha: null,
                  pratyantardasa: [],
                  sookshmadasha: null,
                  sookshmadasa: [],
                  pranadasha: null,
                  pranadasa: [],
                  dehadasha: null,
                  dehadasa: [],
                 };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ level: 1, dasha: nextProps.chartData.todayData.dasha });
  }

  onPress(dasa) {
    this.setState({ level: this.state.level + 1 });
    SwissEphem.calculationOfSubDasha(dasa.startTime, dasa.endTime, dasa.startingPoint)
      .then((result) => {
      this.setState({ dasha: JSON.parse(result) });
      if (this.state.level === 2) {
        this.setState({ antardasha: JSON.parse(result) });
        this.setState({ antardasa: dasa });
      } else if (this.state.level === 3) {
        this.setState({ pratyantardasha: JSON.parse(result) });
        this.setState({ pratyantardasa: dasa });
      } else if (this.state.level === 4) {
        this.setState({ sookshmadasha: JSON.parse(result) });
        this.setState({ sookshmadasa: dasa });
      } else if (this.state.level === 5) {
        this.setState({ pranadasha: JSON.parse(result) });
        this.setState({ pranadasa: dasa });
      } else if (this.state.level === 6) {
        this.setState({ dehadasha: JSON.parse(result) });
        this.setState({ dehadasa: dasa });
      }
    });
  }

  onPressMahadasa() {
    this.setState({ level: 1, dasha: this.props.chartData.todayData.dasha });
  }

  onPressAntardasa() {
    this.setState({ level: 2, dasha: this.state.antardasha });
  }

  onPressPratyantardasa() {
    this.setState({ level: 3, dasha: this.state.pratyantardasha });
  }

  onPressSookshmadasa() {
    this.setState({ level: 4, dasha: this.state.sookshmadasha });
  }

  onPressPranadasa() {
    this.setState({ level: 5, dasha: this.state.pranadasha });
  }

  onPressDehadasa() {
    this.setState({ level: 6, dasha: this.state.dehadasha });
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
      <View>
        <TouchableOpacity onPress={this.onPressMahadasa.bind(this)}>
          <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
            Maha Dasas
          </Text>
        </TouchableOpacity>
        {this.displayDasaLevel()}
        {this.displaycurrentLevel(this.state.level)}
        {this.getDasa()}
      </View>
    );
  }

  displaycurrentLevel(level) {
    const messages = ['Antardasas in this MD: ',
                      'Pratyantardasas in this AD: ',
                      'Sookshma-antardasas in this PD: ',
                      'Praana-antardasas in this SD: ',
                      'Deha-antardasas in this PAD: ',
                    ];
    if (level !== 1) {
      return (
        <Text style={[styles.textStyle, { color: this.props.themeSetting.textColor }]}>
          {messages[level - 2]}
        </Text>
      );
    }
  }

  getDasa() {
    const { textColor } = this.props.themeSetting;
    let dashas = this.state.dasha;
    if (!dashas) {
      dashas = this.props.chartData.todayData.dasha;
    }
    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <Col size={2} style={styles.border}>
              <Text />
            </Col>
            <Col size={3} style={styles.border}>
              <Text style={[styles.textStyle, { color: textColor }]}>Start Time</Text>
            </Col>
            <Col size={3} style={styles.border}>
              <Text style={[styles.textStyle, { color: textColor }]}>End Time</Text>
            </Col>
          </Row>
          {
            dashas.map((dasa, i) => (
              <TouchableOpacity
                key={i} onPress={this.onPress.bind(this, dasa)} disabled={this.state.level === 6}
              >
              <Row>
                <Col size={2} style={styles.border}>
                  <Text style={[styles.textStyle, { color: textColor }]}>{dasa.name}</Text>
                </Col>
                <Col size={3} style={styles.border}>
                  <Text style={[styles.textStyle, { color: textColor }]}>{dasa.startTime}</Text>
                </Col>
                <Col size={3} style={styles.border}>
                  <Text style={[styles.textStyle, { color: textColor }]}>{dasa.endTime}</Text>
                </Col>
              </Row>
            </TouchableOpacity>
          ))
        }
        </Grid>
      </View>
    );
  }

  displayDasaLevel() {
    const { antardasa, pratyantardasa, sookshmadasa, pranadasa, dehadasa } = this.state;
    const { textColor } = this.props.themeSetting;
    const space1 = ' ';
    const space2 = '  ';
    const space3 = '   ';
    const space4 = '    ';
    const space5 = '     ';
    if (this.state.level === 1) {
      return;
    } else if (this.state.level === 2 && antardasa.length !== 0) {
      return (
        <TouchableOpacity onPress={this.onPressAntardasa.bind(this)}>
          <Text style={[styles.textStyle, { color: textColor }]}>
            {space1} {antardasa.name.substr(0, 3)} MD : {antardasa.startTime.substr(0, 12)} - {antardasa.endTime.substr(0, 12)}
          </Text>
        </TouchableOpacity>
      );
    } else if (this.state.level === 3 && pratyantardasa.length !== 0) {
      return (
        <View>
          <TouchableOpacity onPress={this.onPressAntardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space1} {antardasa.name.substr(0, 3)} MD: {antardasa.startTime.substr(0, 12)} - {antardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPratyantardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space2} {pratyantardasa.name.substr(0, 3)} AD: {pratyantardasa.startTime.substr(0, 12)} - {pratyantardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.level === 4 && sookshmadasa.length !== 0) {
      return (
        <View>
          <TouchableOpacity onPress={this.onPressAntardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space1} {antardasa.name.substr(0, 3)} MD: {antardasa.startTime.substr(0, 12)} - {antardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPratyantardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space2} {pratyantardasa.name.substr(0, 3)} AD: {pratyantardasa.startTime.substr(0, 12)} - {pratyantardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSookshmadasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space3} {sookshmadasa.name.substr(0, 3)} PD: {sookshmadasa.startTime.substr(0, 12)} - {sookshmadasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.level === 5 && pranadasa.length !== 0) {
      return (
        <View>
          <TouchableOpacity onPress={this.onPressAntardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space1} {antardasa.name.substr(0, 3)} MD: {antardasa.startTime.substr(0, 12)} - {antardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPratyantardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space2} {pratyantardasa.name.substr(0, 3)} AD: {pratyantardasa.startTime.substr(0, 12)} - {pratyantardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSookshmadasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space3} {sookshmadasa.name.substr(0, 3)} PD: {sookshmadasa.startTime.substr(0, 12)} - {sookshmadasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPranadasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space4} {pranadasa.name.substr(0, 3)} SD: {pranadasa.startTime.substr(0, 12)} - {pranadasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if (this.state.level === 6 && dehadasa.length !== 0) {
      return (
        <View>
          <TouchableOpacity onPress={this.onPressAntardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space1} {antardasa.name.substr(0, 3)} MD: {antardasa.startTime.substr(0, 12)} - {antardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPratyantardasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space2} {pratyantardasa.name.substr(0, 3)} AD: {pratyantardasa.startTime.substr(0, 12)} - {pratyantardasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressSookshmadasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space3} {sookshmadasa.name.substr(0, 3)} PD: {sookshmadasa.startTime.substr(0, 12)} - {sookshmadasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressPranadasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space4} {pranadasa.name.substr(0, 3)} SD: {pranadasa.startTime.substr(0, 12)} - {pranadasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onPressDehadasa.bind(this)}>
            <Text style={[styles.textStyle, { color: textColor }]}>
              {space5} {dehadasa.name.substr(0, 3)} PAD: {dehadasa.startTime.substr(0, 12)} - {dehadasa.endTime.substr(0, 12)}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
  // TODO: Show The date/time and basic planetary ephemeris
    return (
      <Card_R title='Vimsottari Dasa' >
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
    textStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 10,
      paddingLeft: 10,
      fontSize: 16
    },
    border: {
      borderBottomColor: '#BDBDBD',
      borderBottomWidth: 1,
      padding: 2,
    },
});

const mapStateToProps = ({ refreshChart, themeSetting }) => {
    if (refreshChart && refreshChart.chartData) {
        return { chartData: refreshChart.chartData, themeSetting };
    }
    return { chartData: null };
};

export default connect(mapStateToProps)(Dasa);
