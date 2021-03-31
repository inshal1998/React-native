import React, { useEffect, useState } from 'react'
import { View, Text, StatusBar, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native'
import Color from '../misc/Color'
import MySeacrhBar from "../components/MySearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import NoteInputModal from '../components/NoteInputModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from '../components/Notes';
import { useNotes } from '../context/NodeProvider';

const NoteScreen = ({user , navigation}) => {
    const [greet, setgreet] = useState('')
    const [modalVisible, setmodalVisible] = useState(false)
    const {notes , setnotes} =useNotes()

    const findGreet=()=>{
        const hrs = new Date().getHours()
        if (hrs === 0 || hrs <12) {
            return setgreet('Morning')
        }
        if (hrs === 1 || hrs <17) {
            return setgreet('AfterNoon')
        }
        else{
            setgreet('Evening')
        }
    }
    useEffect(() => {
        findGreet()
    }, [])


    const handleOnSubmit = async(title , desc) =>{
        const note = {
            id : Date.now(),
            title : title,
            desc : desc,
            time : Date.now()
        }
        const updateNotes = [...notes,note]
        setnotes(updateNotes)
        await AsyncStorage.setItem('notes',JSON.stringify(updateNotes))
        console.log(note);
    }

    const openNote = (note)=>{
        navigation.navigate('NoteDetail' , {note})
    }
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor={Color.Light}></StatusBar>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                    {notes.length  ? 
                         <MySeacrhBar containerStyle={{marginVerticle:15, paddingBottom:15}}/>    
                        :null}
                    <FlatList 
                        data={notes}
                        numColumns={2}
                        columnWrapperStyle={{justifyContent : "space-between" , marginBottom:15}}
                        keyExtractor= {item =>item.id.toString()}
                        renderItem={({item})=> <Notes onPress={()=>openNote(item)} item={item} />}
                    />
                    {!notes.length ? 
                        <View style={[StyleSheet.absoluteFillObject,styles.emptyHeaderContainer]}>
                            <Text style={styles.emptyHeader}>Add Notes</Text>
                        </View>   
                        : null
                    }    
                    </View>     
            </TouchableWithoutFeedback>
            <RoundIconBtn 
                            onPress={()=>{setmodalVisible(true)}} 
                            antIconName='plus' 
                            style={styles.btn}
                            />
            <NoteInputModal 
                onSubmit={handleOnSubmit}
                visible={modalVisible} 
                onClose={()=>setmodalVisible(false)}/>
        </>
    )
}

const styles = StyleSheet.create({
    header : {
        fontSize : 25,
        fontWeight :"bold",
        padding:15,
    },
    emptyHeader : {
        fontSize : 30,
        textTransform : "uppercase",
        fontWeight :"bold",
        opacity :0.5
    },
    container :{
        paddingHorizontal:20,
        flex :1,   
        zIndex:1
    },
    emptyHeaderContainer : {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        zIndex :-1
    },
    btn : {
        position : "absolute",
        right:20,
        bottom :50,
        zIndex :1
    }
    
})
export default NoteScreen
