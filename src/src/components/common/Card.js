import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';

class Card extends Component {
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
      let suffix = '+';
      if (this.state.visibility) {
          suffix = '-';
      }
      if (this.props.simpleCard) {
        return (
          <View>
            <View style={styles.titleContainer}>
              <Text style={[styles.titleText, { color: this.props.themeSetting.textColor }]}>
                {this.props.title}
              </Text>
            </View>
            <View>{this.props.children}</View>
          </View>
        );
      }
      return (
        <View>
          <View style={styles.titleContainer}>
            <TouchableHighlight

              underlayColor="transparent"
              onPress={this.toggle.bind(this)}
            >
              <Text style={[styles.titleText, { color: this.props.themeSetting.textColor }]}>
                {suffix} {this.props.title}
              </Text>
            </TouchableHighlight>
          </View>
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
    containerStyle: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginTop: 1,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        color: 'black',
    }
 });

 const mapStateToProps = ({ themeSetting }) => {
    return { themeSetting };
 };

 export default connect(mapStateToProps)(Card);
