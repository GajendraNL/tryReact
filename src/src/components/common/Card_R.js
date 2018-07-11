import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View, } from 'react-native';
import { connect } from 'react-redux';
import { scale } from './scaling';

class Card_R extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { visibility: true };
    // TODO: Handle expanded props
  }

  toggle() {
    this.setState({ visibility: !this.state.visibility });
  }

  render() {
    let suffix = '▼';
    if (this.state.visibility) {
      suffix = '▲';
    }

    return (
      <View>
          <TouchableHighlight
            underlayColor={this.props.themeSetting.card_bg}
            onPress={this.toggle.bind(this)}
            style={[styles.panchangaStyle, { backgroundColor: this.props.themeSetting.card_bg }]}
          >
          <View style={styles.titleContainer}>
            <Text adjustsFontSizeToFit allowFontScaling style={[styles.titleText, { color: this.props.themeSetting.textColor }]}>
              {this.props.title}
            </Text>
            <Text adjustsFontSizeToFit style={{ paddingTop: scale(2), paddingBottom: scale(4), color: this.props.themeSetting.textColor }}>
              {suffix}
            </Text>
          </View>
          </TouchableHighlight>

        {
          (() => {
            if (this.state.visibility) {
              return (
                <View>{this.props.children}</View>
                  );
                }
              })()
            }
        </View>
      );
    }
}

 const styles = StyleSheet.create({
  panchangaStyle: {
    borderBottomWidth: scale(1),
    padding: scale(2),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderColor: '#9E9E9E',
    position: 'relative',
  },
  arrowStyle: {
    borderBottomWidth: scale(1),
    paddingTop: scale(3),
    paddingBottom: scale(4),
    width: '5%',
    borderColor: '#9E9E9E',
    position: 'relative'
  },
  titleContainer: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    marginTop: scale(2),
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-light',
    textAlign: 'left',
    alignSelf: 'center',
  }
});

const mapStateToProps = ({ themeSetting }) => {
     return { themeSetting };
};

export default connect(mapStateToProps)(Card_R);
