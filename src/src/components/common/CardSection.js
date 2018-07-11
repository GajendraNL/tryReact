import React from 'react';
import { StyleSheet, View } from 'react-native';

const CardSection = (props) => (
  <View style={styles.containerStyle}>
    {props.children}
  </View>
);

 const styles = StyleSheet.create({
     containerStyle: {
        borderBottomWidth: 1,
         // padding: 2,
         //backgroundColor: '#FFE0B2',
         justifyContent: 'flex-start',
         flexDirection: 'row',
         borderColor: '#9E9E9E',
         position: 'relative',

     }
 });

export { CardSection };
