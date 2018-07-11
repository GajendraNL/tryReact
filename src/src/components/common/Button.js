import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, disabled, children }) => {
    const { buttonStyle } = styles;
    const { textStyle } = disabled ? disabledTextStyles : enabledTextStyles;

    // if (disabled) {
    //   const { textStyle } = disabledTextStyles;
    // } else {
    //   const { textStyle } = enabledTextStyles;
    // }

    return (
        <TouchableOpacity onPress={onPress} disabled={disabled} style={buttonStyle}>
          <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
  buttonStyle: {
      flex: 1,
      alignSelf: 'stretch',
      backgroundColor: '#fff',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#007aff',
      marginLeft: 5,
      marginRight: 5
  }
});

const enabledTextStyles = StyleSheet.create({
  textStyle: {
      alignSelf: 'center',
      color: '#007aff',
      fontSize: 16,
      fontWeight: '600',
      paddingTop: 10,
      paddingBottom: 10
  }
});


const disabledTextStyles = StyleSheet.create({
    textStyle: {
        alignSelf: 'center',
        color: '#d3d3d3d3',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
});


export { Button };
