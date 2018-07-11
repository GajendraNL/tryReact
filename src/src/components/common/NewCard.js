import React from 'react';
import { View, StyleSheet } from 'react-native';

const NewCard = (props) => {
    return (
        <View style={styles.cardStyle}>
            {props.children}
        </View>
    );
}

const styles = StyleSheet.create({
   cardStyle: {
       borderWidth: 0,
       borderRadius: 2,
       borderColor: '#9E9E9E',
       borderBottomWidth: 0,
       shadowColor: '#9E9E9E',
       shadowOffset: { width: 0, height: 2 },
       shadowOpacity: 0.1,
       shadowRadius: 2,
       elevation: 1,
       marginLeft: 5,
       marginRight: 5,
       marginTop: 10,
   },

});

export { NewCard };
