import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import PanchangaDetails from './PanchangaDetails';
import BasicDetailsCard from './BasicDetailsCard';
import SouthIndianChartCard from './SouthIndianChartCard';
import SouthIndianDNineChart from './SouthIndianDNineChart';
import NorthIndianChart from './NorthIndianChart';
import NorthIndianD9Chart from './NorthIndianD9Chart';
import Tarabalam from './Tarabalam';
import Kalam from './Kalam';
import Dasa from './Dasa';
// import HomeScreen from './HomeScreen';

class AstroList extends Component {
  state = { };

  renderD1Chart() {
    if (this.props.settings.charts_Type === 0) {
      return <SouthIndianChartCard />;
    }
    return <NorthIndianChart />;
  }

  renderD9Chart() {
    if (this.props.settings.charts_Type === 0) {
      return <SouthIndianDNineChart />;
    }
    return <NorthIndianD9Chart />;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled>
        <PanchangaDetails />
        <Kalam />
        <Tarabalam />
        {this.renderD1Chart()}
        {this.renderD9Chart()}
        <Dasa />
        <BasicDetailsCard />
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ settings }) => {
  if (settings) {
    return { settings };
  }
  return { settings: null };
};

export default connect(mapStateToProps)(AstroList);
