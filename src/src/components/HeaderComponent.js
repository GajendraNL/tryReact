import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { scale } from './common/scaling';

class HeaderComponent extends Component {
  render() {
    const { theme_state, headerbg, textColor } = this.props.themeSetting;
    const header = theme_state===0 ? require('../../images/menu.png') : require('../../images/menu_n.png');
    return (
      <View style={{ backgroundColor: headerbg }}>
        <View style={styles.con}>
          <TouchableHighlight
            style={{ flex: 1 }}
            onPress={() => {
              const { navigate } = this.props.navigation.navigate('DrawerOpen'); }
            }
          >
            <Image
              style={{ width: scale(30), height: scale(30), }}
              source={header}
            />
          </TouchableHighlight>
          <Text style={[styles.textStyle, { color: textColor }]}> Astro App</Text>
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
  con: {
    paddingLeft: scale(3),
    paddingTop: scale(2),
    flexDirection: 'row',
    height: scale(35),
    },
  textStyle: {
    flex: 6,
    fontSize: scale(18),
    fontWeight: 'bold',
  },
});

const mapStateToProps = ({ themeSetting }) => {
    return { themeSetting };
};

export default connect(mapStateToProps)(HeaderComponent);
