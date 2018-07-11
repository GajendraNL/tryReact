import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
//        color: '#ffffff'
    },
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      //  backgroundColor: '#E65100',
        height: 50,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        elevation: 2,
        position: 'relative'
    }
});


export { Header };
