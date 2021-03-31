import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Color from '../misc/Color'

const Notes = ({item , onPress}) => {
    const {title , desc}= item
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text numberOfLines={2} style={styles.title}>
                {title}
            </Text>
            <Text numberOfLines={3}>
                {desc}
            </Text>
        </TouchableOpacity>
    )
}
const width = Dimensions.get('window').width -40
const styles = StyleSheet.create({
    container : {
        backgroundColor : Color.Primary,
        width: width /2 -10,
        padding :8,
        borderRadius :10
    },
    title : {
        fontWeight :"bold",
        fontSize : 16,
        color : Color.Light
    }
})
export default Notes
