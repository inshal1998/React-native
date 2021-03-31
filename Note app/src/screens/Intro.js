import React,{useState} from "react";
import { StyleSheet , Text, TextInput, View,Dimensions } from "react-native";
import RoundIconBtn from "../components/RoundIconBtn";
import color from "../misc/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Intro = ({onFinish}) =>{
    const [name, setName] = useState('')
    const handleChangeText= text=> setName(text)
    const handleSubmit = async ()=>{
        const user = {name : name}
        await AsyncStorage.setItem('user',JSON.stringify(user))
        console.log("Pressed");
        if(onFinish){ 
            onFinish()
        }
    }
    return(
        
            <View style={styles.container}>
                <Text style={styles.txttitle}>Enter Your Name To Continue</Text>
                <TextInput 
                    placeholder="Enter Name"
                        style={styles.txtInput}
                        value={name}
                        onChangeText={handleChangeText}/>
                        {
                            name.trim().length >= 3 ? 
                                <RoundIconBtn 
                                antIconName='arrowright'
                                onPress={handleSubmit}/>
                                    : null
                        }
            </View>
    )
}
const width=Dimensions.get("window").width-50;

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    txtInput : {
        paddingLeft:15,
        borderRadius:10,
        height:50,
        borderWidth:2,
        borderColor : color.Primary,
        width: width,
        marginBottom:15 
    },
    txttitle : {
        alignSelf:"flex-start",
        paddingLeft:25,
        marginBottom:5,
        opacity:0.5
    }
})

export default Intro    