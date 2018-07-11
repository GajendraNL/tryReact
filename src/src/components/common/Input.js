import React from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View
} from 'react-native';


const Input = ({ label, onChangeText, value, placeholder, secureTextEntry }) => {
    const { inputStyle, TextinputStyle, labelStyle, containerStyle } = styles;
    console.log('Render Input component');
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                placeholder={placeholder}
                autoCorrect={false}
                style={TextinputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
    //    color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 20,
        width: 100
    },
    TextinputStyle: {
        width: 100,
        height: 40,
        borderColor: 'gray',
        borderWidth: 0
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export { Input };
