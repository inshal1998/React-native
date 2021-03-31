import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import  AntDesign  from "react-native-vector-icons/AntDesign";
import Color from '../misc/Color';
const  RoundIconBtn= ({antIconName, size , color, style,onPress})=> {
    return (
       <AntDesign
            name={antIconName}
            size={size || 24}
            color={color || Color.Light}
            onPress={onPress}
            style={[styles.icon,{...style}]}
       />
    );
}

const styles = StyleSheet.create({
    icon : {
         backgroundColor: Color.Primary,
         padding:15,
         borderRadius:50,
         elevation:5,
    }
})

export default RoundIconBtn
