import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { save_data } from '../actions';
import { scale } from './common/scaling';

const mapDispatchToProps = dispatch => {
  return {
    save_data: data => dispatch(save_data(data))
  };
};

class SaveDetails extends Component {
  constructor(props) {
    super(props);
  }

  state = { name: '' };

  saveData() {
    const { params } = this.props.navigation.state;
    const name = this.state.name;
    const year = params.date1.substr(0, 4);
    const month = params.date1.substr(5, 2);
    const day = params.date1.substr(8, 2);
    const hour = params.time1.substr(0, 2);
    const min = params.time1.substr(3);
    const sec = 0;
    const lng = params.lng;
    const lat = params.lat;
    const ayanamsa = params.ayanamsaType;
    const selectedTab = -1;
    let utcOffset = parseFloat(params.tzOffset);
    const city = params.picked;

    const saveData = { name, year, month, day, hour, min, sec, lng, lat, ayanamsa, selectedTab, utcOffset, city };

    this.props.save_data(saveData);
  }

  handleSubmit() {
    this.saveData();
    this.props.navigation.goBack();
  }

    render() {
        return (
            <View>
              <View style={{ marginTop: scale(10), alignItems: 'center' }}>
                <Text>Please enter a name and click save</Text>
              </View>
              <View>
                <TextInput
                  style={{ width: '80%', alignSelf: 'center', textAlign: 'center', fontSize: scale(20) }}
                  placeholder='type here'
                  onChangeText={userName => this.setState({ name: userName })}
                />
              </View>
              <View style={{ alignSelf: 'center', marginTop: scale(20) }}>
                <TouchableOpacity style={styles.saveButton} onPress={this.handleSubmit.bind(this)}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  saveButton: {
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007aff',
  },
  buttonText: {
    fontSize: scale(16),
    alignItems: 'center',
    padding: scale(12),
    paddingTop: scale(3),
    paddingBottom: scale(3)
  }
});

export default connect(null, mapDispatchToProps)(SaveDetails);
