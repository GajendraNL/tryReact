import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import SwissEphem from '../../SwissEphem';
import { scale } from './common/scaling';
import { NewCard } from './common';
import { doRefresh, updateSavedDates } from '../actions';

class ShowData extends Component {
  state={ selectedDate: 0, isModalVisible: false, name: '', year: '', month: '', day: '', hour: '', min: '', lat: '', lng: '' };

  onOpen(index) {
    const savedDate = this.props.saved_info.saved_info[index.index];
    const year = parseFloat(savedDate.year);
    const month = parseFloat(savedDate.month);
    const day = parseFloat(savedDate.day);
    const hour = parseFloat(savedDate.hour);
    const min = parseFloat(savedDate.min);
    const sec = 0;
    const lng = parseFloat(savedDate.lng);
    const lat = parseFloat(savedDate.lat);
    const ayanamsa = savedDate.ayanamsa;
    const city = savedDate.city;
    const selectedTab = -1;
    let utcOffset = parseFloat(savedDate.utcOffset);


    SwissEphem.computeChart(year, month, day,
        hour, min, sec, lat, lng, utcOffset, ayanamsa, selectedTab, city).then((chartStr) => {
            this.setState({ chartData: JSON.parse(chartStr) }, () => {
                this.props.doRefresh(this.state);
                this.props.navigationProps.navigate('Home');
            });
        });
  }

  toggleModal() {
    const oldDates = this.props.saved_info.saved_info;
    const updatedDetails = { name: this.state.name,
                            year: this.state.year,
                            month: this.state.month,
                            day: this.state.day,
                            hour: this.state.hour,
                            min: this.state.min,
                            lat: this.state.lat,
                            lng: this.state.lng,
                            ayanamsa: 'isRaman',
                            utcOffset: 5.5,
                            selectedTab: -1,
                            sec: 0,
                            city: '',

      };
    oldDates[this.state.selectedDate] = updatedDetails;
    this.props.updateSavedDates(oldDates);
    this.setState({ isModalVisible: false });
  }

  onCancel() {
    this.setState({ isModalVisible: false });
  }

  onEdit(i) {
    const data = this.props.saved_info.saved_info[i.index];
    this.setState({ selectedDate: i.index,
                    isModalVisible: true,
                    name: data.name,
                    year: data.year,
                    month: data.month,
                    day: data.day,
                    hour: data.hour,
                    min: data.min,
                    lat: data.lat,
                    lng: data.lng
                  });
  }

  onDelete(i) {
    Alert.alert(
      'Click OK to delete',
      '',
      [
        { text: 'OK', onPress: () => { this.deleteData(i); } },
        { text: 'CANCEL', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  getPosition(v) {
    const { textColor } = this.props.themeSetting;
      return (
        <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ width: '25%', paddingLeft: 10, color: textColor }}>Langitude</Text>
          <Text style={{ width: '5%', color: textColor }}>:</Text>
          <Text style={{ width: '55%', color: textColor }}>{v.lng}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={{ width: '25%', paddingLeft: 10, color: textColor }}>Latitude</Text>
          <Text style={{ width: '5%', color: textColor }}>:</Text>
          <Text style={{ width: '55%', color: textColor }}>{v.lat}</Text>
        </View>
        </View>
      );
  }

  deleteData(i) {
    const oldDates = this.props.saved_info.saved_info;
    oldDates.splice(i.index, 1);
    this.props.updateSavedDates(oldDates);
  }

  render() {
    const info = this.props.saved_info.saved_info;
    const { themeSetting } = this.props;
    if (this.props.saved_info.saved_info.length === 0) {
      return (
        <View
          style={{ alignItems: 'center',
                justifyContent: 'center',
                flex: 2,
                backgroundColor: themeSetting.astroListbg }}
        >
          <NewCard>
            <Text style={[styles.textStyle, { color: themeSetting.textColor }]}>No Data </Text>
          </NewCard>
        </View>
      );
    }
      return (
        <View style={{ alignItems: 'center', backgroundColor: themeSetting.astroListbg, flex: 1 }}>
          <Text style={[styles.textStyle, { color: themeSetting.textColor }]}> Saved Information </Text>
            <View>
              {info.map((v, index) => {
                 return (
                   <NewCard >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ color: themeSetting.textColor, fontSize: scale(18) }}>{index + 1}. {v.name}</Text>
                     </View>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                       <Text style={{ width: '25%', paddingLeft: 10, color: themeSetting.textColor }}>Date</Text>
                       <Text style={{ width: '5%', color: themeSetting.textColor }}>:</Text>
                       <Text style={{ width: '55%', color: themeSetting.textColor }}>{v.year}-{v.month}-{v.day}</Text>
                     </View>
                     <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                       <Text style={{ width: '25%', paddingLeft: 10, color: themeSetting.textColor }}>Time</Text>
                       <Text style={{ width: '5%', color: themeSetting.textColor }}>:</Text>
                       <Text style={{ width: '55%', color: themeSetting.textColor }}>{v.hour}:{v.min}</Text>
                     </View>
                     {this.getPosition(v)}
                     <View style={{ flexDirection: 'row', marginTop: scale(15), justifyContent: 'space-around' }}>
                      <TouchableOpacity
                        style={styles.buttonStyle} onPress={this.onOpen.bind(this, { index })}
                      >
                        <Text style={styles.textStyle2}>Open</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.buttonStyle} onPress={this.onEdit.bind(this, { index })}
                      >
                        <Text style={styles.textStyle2}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.buttonStyle} onPress={this.onDelete.bind(this, { index })}
                      >
                        <Text style={styles.textStyle2}>Delete</Text>
                      </TouchableOpacity>
                     </View>
                   </NewCard>
                  );
              })}
          </View>
          <Modal isVisible={this.state.isModalVisible} avoidKeyboard={false} >
            <ScrollView style={{ marginTop: scale(10), padding: scale(20), backgroundColor: 'white' }}>
              <Text>Edit</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Name: </Text>
                <TextInput
                  value={this.state.name}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ name: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Year: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.year.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ year: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Month: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.month.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ month: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Day: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.day.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ day: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Hour: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.hour.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ hour: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Minute: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.min.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ min: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Longitude: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.lng.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ lng: value })}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ width: '30%', fontSize: scale(14) }}>Latitude: </Text>
                <TextInput
                  keyboardType='numeric'
                  value={this.state.lat.toString()}
                  style={{ width: '60%', alignSelf: 'center', textAlign: 'center', fontSize: scale(14) }}
                  onChangeText={(value) => this.setState({ lat: value })}
                />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: scale(20) }}>
                <TouchableOpacity onPress={this.toggleModal.bind(this)}>
                  <Text>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCancel.bind(this)}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  textStyle2: {
      alignSelf: 'center',
      color: '#007aff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
  },
  buttonStyle: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5
  },
  textStyle: {
    fontSize: 25,
    color: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,

  },
  cardStyle: {
    fontSize: 12,
    color: '#000000',
  },

});

const mapStateToProps = ({ saved_info, themeSetting, refreshChart, ayanamsa }) => {
	if (saved_info && themeSetting && refreshChart) {
    return { saved_info, themeSetting, refreshChart, ayanamsa };
	}
	return { saved_info: null };
};

const mapDispatchToProps = dispatch => {
  return {
    doRefresh: data => dispatch(doRefresh(data)),
    updateSavedDates: data => dispatch(updateSavedDates(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowData);
