import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import Color from '../misc/Color'

const SearchBar = ({containerStyle}) => {
    return (
        <View style={[styles.container,{...containerStyle}]}>
            <TextInput 
                style={styles.searchBar}
                placeholder="Search Here"
            ></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar : {
        borderRadius:40,
        paddingLeft:15,
        fontSize:20,
        height:40,
        borderWidth : 0.5,
        borderColor:Color.Primary,
    },
    container : {
    }
})

export default SearchBar
