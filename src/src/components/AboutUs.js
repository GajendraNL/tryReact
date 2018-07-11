import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Linking, Image,
  TouchableOpacity } from 'react-native';
import { NewCard, CardSection } from './common';
import HeaderComponent from './HeaderComponent';
import { scale } from './common/scaling';

class AboutUs extends React.Component {
  static navigationOptions = () => {
    const drawerLabel = 'About';
    const drawerIcon = () => (
      <Image
        source={require('../../images/aboutus.png')}
        style={{ width: 26, height: 26 }}
      />
    );
    return { drawerLabel, drawerIcon };
  }

  render() {
      const { textColor, astroListbg } = this.props.themeSetting;
      const rrrf = 'http://www.rrrf.in/';
      const magazine = 'http://modernastrology.co.in/wp/subscription/';
      return (
        <View style={{ flex: 1, backgroundColor: astroListbg, justifyContent: 'space-between' }}>
          <View>
            <HeaderComponent {...this.props} />
            <TouchableOpacity onPress={() => Linking.openURL(rrrf)}>
              <View style={styles.buttonStyle}>
                <Text style={[styles.textStyle, { color: textColor }]}>Research Foundation</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(magazine)}>
              <View style={styles.buttonStyle}>
                <Text style={[styles.textStyle, { color: textColor }]}>Astrological e-Magazine</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(rrrf)}>
              <View style={styles.buttonStyle}>
                <Text style={[styles.textStyle, { color: textColor }]}>Terms of Service</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL(rrrf)}>
              <View style={styles.buttonStyle}>
                <Text style={[styles.textStyle, { color: textColor }]}>Contact Us</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: scale(25), marginBottom: scale(6) }}>
            <Text style={{ color: textColor }}>Developed by: Fork Technologies, Bangalore</Text>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
    padding: scale(10),
    marginLeft: scale(15),
    marginRight: scale(15)
  },
  textStyle: {
    fontSize: scale(18),
  }
});

const mapStateToProps = ({ themeSetting }) => {
  return { themeSetting };
};

export default connect(mapStateToProps)(AboutUs);
