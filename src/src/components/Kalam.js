import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NewCard, } from './common';
import Card_R from './common/Card_R';
import { scale } from './common/scaling';

class Kalam extends Component {
  constructor(props) {
    super(props);
    this.state = { chartData: null, nakshatraDetails: null };
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
      <View>{this.kalam()}</View>
    );
  }

  kalam() {
    const kaalam = this.props.chartData.todayData.kalam;
    const { textColor } = this.props.themeSetting;
    return (
      <View style={styles.container}>
        <Grid >
          <Row>
            <Col size={45} style={styles.border}>
              <Text />
            </Col>
            <Col size={25} style={styles.border}>
              <Text style={[styles.textStyle, { color: textColor }]}>Start Time</Text>
            </Col>
            <Col size={25} style={styles.border}>
              <Text style={[styles.textStyle, { color: textColor }]}>End Time</Text>
            </Col>
          </Row>
          {
          kaalam.map((kaala, i) => (
            <Row key={i}>
              <Col size={45} style={styles.border}>
                <Text style={[styles.textStyle, { color: textColor }]}>{kaala.kalamName}</Text>
              </Col>
              <Col size={25} style={styles.border}>
                <Text style={[styles.textStyle, { color: textColor }]}>{kaala.startTime}</Text>
              </Col>
              <Col size={25} style={styles.border}>
                <Text style={[styles.textStyle, { color: textColor }]}>{kaala.endTime}</Text>
              </Col>
            </Row>
          ))
        }
        </Grid>
      </View>
    );
  }

  render() {
  // TODO: Show The date/time and basic planetary ephemeris
    return (
      <Card_R title='Kala Information' >
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
      paddingTop: 3,
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
    if (refreshChart && refreshChart.chartData && themeSetting) {
        return { chartData: refreshChart.chartData, themeSetting };
    }
    return { chartData: null };
};


export default connect(mapStateToProps)(Kalam);
