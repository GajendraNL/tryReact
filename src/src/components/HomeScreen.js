import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, Picker } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
//import ModalPicker from 'react-native-modal-picker';
import ModalFilterPicker from 'react-native-modal-filter-picker'
import SwissEphem from '../../SwissEphem';
import { scale, } from './common/scaling';
import AstroList from './AstroList';
import { CardSection } from './common';
import { doRefresh } from '../actions';
import Card from './common/Card';

const mapDispatchToProps = dispatch => {
  return {
    doRefresh: data => dispatch(doRefresh(data)),
  };
};

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const dateInfo = this.getDateStr(moment().format('YYYY-MM-DD HH:mm'));
        const dateStr = dateInfo.localeDateInfo.dateStr;
        const timeStr = dateInfo.localeDateInfo.timeStr;
        this.state = {
            date: dateStr,
            dateInfo,
            lng: 77.5476,
            lat: 13.0025,
            picked: 'Bangalore, Karnataka,',
            visible: false,
            tzOffset: '5.5',
            modalVisible: false,
            opacity: 1,
            date1: dateStr.substr(0, 10),
            time1: timeStr,
            ayanamsaType: this.props.settings.ayanamsa_type,
        };

        this.getBasicDetails.bind(this);
    }

    componentWillMount() {
        if (this.props.refreshChart) {
          const { cityInfo } = this.props.refreshChart.chartData.todayData;
          const { longitude, latitude } = this.props.refreshChart.chartData.todayData.locationInfo;
          const { eventDateWithTimeZone, dateWithZone } = this.props.refreshChart.chartData.todayData.dateInfo;
          this.setState({ lng: longitude.decimal.toString().substr(0, 7),
              lat: latitude.decimal.toString().substr(0, 7),
              time1: eventDateWithTimeZone.substr(13, 5),
              date1: dateWithZone,
              tzOffset: cityInfo.utc.toFixed(1),
              picked: cityInfo.city,
           });
        }
    }

    componentDidMount() {
        if (!this.props.refreshChart) {
          // navigator.geolocation.getCurrentPosition(
          //     (position) => {
          //         this.setState({
          //           lat: position.coords.latitude,
          //           lng: position.coords.longitude,
          //           error: null,
          //         });
          //     },
          //     (error) => {
          //         this.setState({ error: error.message });
          //     },
          //     { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
          // );
          this.getBasicDetails();
        }
    }

    onShow = () => {
        this.setState({ visible: true });
    }

    onSelectCity = (picked) => {
        const selectedCity = this.props.cities[this.props.cities.map(function (item) { return item.key; }).indexOf(picked)];
        const decimal = (this.props.settings.longitudeRepresentation === 1)
        if (selectedCity) {
            this.setState({
              lat: selectedCity.lat.dd,
              lng: selectedCity.lng.dd,
              tzOffset: selectedCity.timeZoneOffSet,
              picked,
              visible: false
            }, () => {
                this.getBasicDetails();
            });
        } else {
            this.setState({
              picked,
              visible: false
            });
        }
    }

    onCancel = () => {
        this.setState({
          visible: false
        });
    }

    onSelectOffset = (picked, pos) => {
        this.setState({
          tzOffset: picked
        }, () => this.getBasicDetails());
    }

    oneDateTimeChanged(date) {
        this.setState({ date1: date }, () => {
          this.getBasicDetails();
        });
    }

    onTimeChanged(time) {
      this.setState({ time1: time }, () => this.getBasicDetails());
    }

    getBasicDetails() {
        const year = parseFloat(this.state.date1.substr(0, 4));
        const month = parseFloat(this.state.date1.substr(5, 2));
        const day = parseFloat(this.state.date1.substr(8, 2));
        const hour = parseFloat(this.state.time1.substr(0, 2))
        const min = parseFloat(this.state.time1.substr(3));
        const sec = 0;
        const lng = parseFloat(this.state.lng);
        const lat = parseFloat(this.state.lat);
        const selectedTab = -1;
        const ayanamsa = this.state.ayanamsaType;
        const city = this.state.picked;
        let utcOffset = parseFloat(this.state.tzOffset);

        SwissEphem.computeChart(year, month, day,
            hour, min, sec, lat, lng, utcOffset, ayanamsa, selectedTab, city).then((chartStr) => {
                this.setState({ chartData: JSON.parse(chartStr) }, () => {
                    this.props.doRefresh(this.state);
                });
            });
    }

    getDateStr(dStr) {
        let m = null;
        let mUTC = null;
        m = moment(dStr, 'YYYY-MM-DD HH:mm');
        mUTC = moment(dStr, 'YYYY-MM-DD HH:mm').utc();
        const localeDateInfo = this.dateStrToFields(m);
        const utcDateInfo = this.dateStrToFields(mUTC);
        return {
            utcDateInfo,
            localeDateInfo
        };
    }

    getDate() {
        this.datePicker.onPressDate();
    }

    getTime() {
        this.timePicker.onPressDate();
    }

    dateStrToFields(m) {
        const year = m.format('YYYY');
        const month = m.format('MM');
        const day = m.format('DD');
        const hour = m.format('HH');
        const min = m.format('mm');
        const dateStr = m.format('YYYY-MM-DD HH:mm');
        const timeStr = m.format('HH:mm');
        //`${year}-${month}-${day} ${hour}:${min}`;
        return {
            dateStr,
            timeStr,
            year: Number(year),
            month: Number(month),
            day: Number(day),
            hour: Number(hour),
            min: Number(min)
        };
    }


    // onScroll(event){
    //     const percent = 100 * event.nativeEvent.contentOffset.y / event.nativeEvent.contentSize.height;
    //     if(percent > 70){
    //         this.setState({
    //             opacity:0
    //         })
    //     }else{
    //         this.setState({
    //             opacity:1
    //         })
    //     }
    // }

    decrementDate() {
      const newDate = moment(this.state.date1, 'YYYY-MM-DD').add(-1, 'days');
      this.setState({ date1: newDate.format('YYYY-MM-DD') }, () => this.getBasicDetails());
    }

    decrementTime() {
      const newTime = moment(this.state.time1, 'HH:mm').add(-1, 'hours');
      this.setState({ time1: newTime.format('HH:mm') }, () => this.getBasicDetails());
    }

    incrementDate() {
      const newDate = moment(this.state.date1, 'YYYY-MM-DD').add(1, 'days');
      this.setState({ date1: newDate.format('YYYY-MM-DD') }, () => this.getBasicDetails());
    }

    incrementTime() {
      const newTime = moment(this.state.time1, 'HH:mm').add(1, 'hours');
      this.setState({ time1: newTime.format('HH:mm') }, () => this.getBasicDetails());
    }

    endEdit() {
      if (this.state.lat && this.state.lng) {
        this.getBasicDetails();
      }
    }

    getUTCCardSection() {
      const saveIcon = this.props.themeSetting.theme_state === 0 ? require('../../images/save.png') : require('../../images/save_n.png');
      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <View style={[styles.thumbNailContainerStyle, { width: '50%' }]}>
            <Text
              style={{ fontSize: scale(12), marginLeft: 5, paddingLeft: 5, color: this.props.themeSetting.textColor}}
            >
              Please choose timezone UTC:
            </Text>
          </View>
          <View style={[styles.headerContentStyle, { width: '30%', height: scale(30) }]}>
            <Picker
              style={{ width: scale(120), color: this.props.themeSetting.textColor }}
              selectedValue={this.state.tzOffset}
              onValueChange={this.onSelectOffset.bind(this)}
              itemStyle={styles.itemStyle}
            >
              <Picker.Item label='−12:00' value='-12.0' />
              <Picker.Item label='−11:00' value='-11.0' />
              <Picker.Item label='−10:00' value='-10.0' />
              <Picker.Item label='−09:30' value='-9.5' />
              <Picker.Item label='−09:00' value='-9.0' />
              <Picker.Item label='−08:00' value='-8.0' />
              <Picker.Item label='−07:00' value='-7.0' />
              <Picker.Item label='−06:00' value='-6.0' />
              <Picker.Item label='−05:00' value='-5.0' />
              <Picker.Item label='−04:00' value='-4.0' />
              <Picker.Item label='−03:30' value='-3.5' />
              <Picker.Item label='−03:00' value='-3.0' />
              <Picker.Item label='−02:00' value='-2.0' />
              <Picker.Item label='−01:00' value='-1.0' />
              <Picker.Item label='+00:00' value='0.0' />
              <Picker.Item label='+01:00' value='1.0' />
              <Picker.Item label='+02:00' value='2.0' />
              <Picker.Item label='+03:00' value='3.0' />
              <Picker.Item label='+03:30' value='3.5' />
              <Picker.Item label='+04:00' value='4.0' />
              <Picker.Item label='+04:30' value='4.5' />
              <Picker.Item label='+05:00' value='5.0' />
              <Picker.Item label='+05:30' value='5.5' />
              <Picker.Item label='+05:45' value='5.75' />
              <Picker.Item label='+06:00' value='6.0' />
              <Picker.Item label='+06:30' value='6.5' />
              <Picker.Item label='+07:00' value='7.0' />
              <Picker.Item label='+08:00' value='8.0' />
              <Picker.Item label='+08:30' value='8.5' />
              <Picker.Item label='+08:45' value='8.75' />
              <Picker.Item label='+09:00' value='9.0' />
              <Picker.Item label='+09:30' value='9.5' />
              <Picker.Item label='+10:00' value='10.0' />
              <Picker.Item label='+10:30' value='10.5' />
              <Picker.Item label='+11:00' value='11.0' />
              <Picker.Item label='+12:00' value='12.0' />
              <Picker.Item label='+12:45' value='12.75' />
              <Picker.Item label='+13:00' value='13.0' />
              <Picker.Item label='+14:00' value='14.0' />

            </Picker>
          </View>
          <View style={{ width: '10%' }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => { this.props.navigation.navigate('SaveDetails', this.state); }}
            >
              <Image
              style={{ width: scale(25), height: scale(25), }}
              source={saveIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    renderLocationSelectionCardSection() {
      const { visible, picked } = this.state;
      const { themeSetting } = this.props;
      return (
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.thumbNailContainerStyle, { width: '8%', marginLeft: scale(5) }]}>
            <Text style={{ fontSize: scale(12), color: themeSetting.textColor }}>City:</Text>
          </View>
          <View style={[styles.container, { width: '25%', backgroundColor: themeSetting.card_bg }]}>
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onShow}>
              <Text style={{ fontSize: scale(12), color: themeSetting.textColor }}>{picked.substr(0, picked.indexOf(','))}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.label}>Selected:</Text> */}
            {/* <Text>{picked}</Text> */}
            <ModalFilterPicker
              visible={visible}
              onSelect={this.onSelectCity.bind(this)}
              onCancel={this.onCancel.bind(this)}
              onRequestClose={() => console.log('onRequestClose')}
              options={this.props.cities}
            />
          </View>
          <View style={[styles.thumbNailContainerStyle, { width: '8%' }]}>
            <Text style={{ fontSize: scale(12), color: themeSetting.textColor }}> OR </Text>
          </View>
          <View style={[styles.thumbNailContainerStyle, { width: '8%' }]}>
            <Text style={{ fontSize: scale(12), color: themeSetting.textColor }}>Lng</Text>
          </View>
          <View style={[styles.headerContentStyle, { width: '16%' }]}>
            <TextInput
              style={{ color: themeSetting.textColor }}
              onChangeText={(value) => this.setState({ lng: value })}
              onEndEditing={this.endEdit.bind(this)}
              keyboardType='numeric'
              value={this.state.lng.toString().substr(0, 7)}
            />
          </View>
          <View style={[styles.thumbNailContainerStyle, { width: '8%' }]}>
            <Text style={{ fontSize: scale(12), color: themeSetting.textColor }}>Lat</Text>
          </View>
          <View style={[styles.headerContentStyle, { width: '16%' }]}>
            <TextInput
              style={{ color: themeSetting.textColor }}
              onChangeText={(value) => this.setState({ lat: value })}
              onEndEditing={this.endEdit.bind(this)}
              keyboardType='numeric'
              value={this.state.lat.toString().substr(0, 7)}
            />
          </View>

          <View style={{ marginLeft: 0 }}>
            <DatePicker
              style={{ width: 0 }}
              date={this.state.date1}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="1400-01-01"
              maxDate="2200-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              ref={(picker) => { this.datePicker = picker; }}
              onDateChange={this.oneDateTimeChanged.bind(this)}
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  height: 0,
                  width: 0,
                  borderWidth: 0
                }
              }}
            />
          </View>
          <View style={{ marginLeft: 0 }}>
            <DatePicker
              style={{ width: 0 }}
              date={this.state.time1}
              mode="time"
              placeholder="select time"
              format="HH:mm"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              ref={(picker) => { this.timePicker = picker; }}
              onDateChange={this.onTimeChanged.bind(this)}
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  height: 0,
                  width: 0,
                  borderWidth: 0
                }
              }}
            />
          </View>
          </View>
      );
    }

    render() {
        const { themeSetting } = this.props;
        return (
          <View style={{ flex: 1, backgroundColor: themeSetting.astroListbg }}>
            <Card title='' expanded simpleCard >
              <CardSection>
                <View style={styles.responsive_utc}>
                  <View style={{ flex: 1, flexDirection: 'row', backgroundColor: themeSetting.astroListbg }}>
                    <TouchableOpacity onPress={this.decrementDate.bind(this)} disabled={false} style={[styles.imageStyle, { backgroundColor: themeSetting.astroListbg }]}>
                      <Image
                        style={{ width: scale(20), height: scale(20) }}
                        source={require('../../images/left.png')}
                        backgroundColor={themeSetting.astroListbg}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.getDate.bind(this)} disabled={false} style={[styles.buttonStyle, { backgroundColor: themeSetting.astroListbg }]}>
                      <Text adjustsFontSizeToFit allowFontScaling style={[styles.textStyle, { color: themeSetting.textColor }]}>
                        {this.state.date1}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.incrementDate.bind(this)} disabled={false} style={[styles.imageStyle, { backgroundColor: themeSetting.astroListbg }]}>
                      <Image
                        style={{ width: scale(20), height: scale(20) }}
                        source={require('../../images/right.png')}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.decrementTime.bind(this)} disabled={false} style={[styles.imageStyle, { backgroundColor: themeSetting.astroListbg }]}>
                      <Image
                        style={{ width: scale(20), height: scale(20) }}
                        source={require('../../images/left.png')}
                        backgroundColor={themeSetting.astroListbg}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.getTime.bind(this)} disabled={false} style={[styles.buttonStyle, { backgroundColor: themeSetting.astroListbg }]}>
                      <Text adjustsFontSizeToFit allowFontScaling style={[styles.textStyle, { color: themeSetting.textColor }]}>
                        {this.state.time1}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.incrementTime.bind(this)} disabled={false} style={[styles.imageStyle, { backgroundColor: themeSetting.astroListbg }]}>
                      <Image
                        style={{ width: scale(20), height: scale(20) }}
                        source={require('../../images/right.png')}
                        backgroundColor={themeSetting.astroListbg}
                      />
                    </TouchableOpacity>
                  </View>

                </View>
              </CardSection>

            </Card>
            {/* <ScrollView contentContainerStyle={{flexGrow:1}} scrollEnabled onScroll={this.onScroll.bind(this)} scrollEventThrottle={10} > */}
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} scrollEnabled >
                {this.renderLocationSelectionCardSection()}
                {this.getUTCCardSection()}
              <AstroList />
            </ScrollView>
            {/* <View style={styles.scroll_floating}>
              <TouchableHighlight style={[styles.addButton,{opacity:this.state.opacity}]}
                underlayColor='#ff7043'
                onPress={()=>{this.getDate()}}
                // onPress={this.showPicker}
              >
                <Image style={{width:(33),height:scale(30)}} source={require('../../images/calendar1.png')} />
              </TouchableHighlight>
            </View> */}
          </View>
        );
    }
}


const styles = StyleSheet.create({
  thumbNailStyle: {
    height: 50,
    width: 50
  },
  thumbNailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: scale(5),
    opacity: 1
  },
  buttonStyle: {
    flex: 4,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 1,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 0,
    marginRight: 0,
    height: scale(26)
  },
  textStyle: {
    alignSelf: 'center',
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    //  backgroundColor: '#FFE0B2'
  },
  offsetPickerContentStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    //  backgroundColor: '#FFE0B2'
  },
  imageStyle: {
    flex: 0.9,
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 0,
    marginRight: 0,
    height: scale(26)
  },
  container: {
    alignSelf: 'center',
    marginRight: scale(5),
  },
  buttonContainer: {
    borderRadius: 4,
    shadowColor: '#000000',
    marginLeft: scale(5),
    shadowOffset: {
      width: 0,
      height: 3
    },
    justifyContent: 'center',
    alignItems: 'center',
    shadowRadius: 10,
    shadowOpacity: 0.25,
    //    backgroundColor: '#E65100'
  },
  itemStyle: {
    fontSize: scale(12),
    height: 75,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  picker: {
    width: 120,
  },
  addButton: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
    borderWidth: 1,
    height: scale(50),
    width: scale(50),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    bottom: 15,
    right: 10,
    shadowColor: '#9E9E9E',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  },
  responsive: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  responsive_utc: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '50%'
  },
  scroll_floating: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'relative',
    bottom: 15,
    right: 10,

  }
});


const mapStateToProps = state => {
    const { cities, offsets, settings, themeSetting, refreshChart } = state;
    return { cities, offsets, settings, themeSetting, refreshChart };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
