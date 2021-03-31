import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native'
import { useHeaderHeight } from "@react-navigation/stack";
import Color from '../misc/Color';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNotes } from '../context/NodeProvider';
import NoteInputModal from './NoteInputModal';

const formatDate = ms=>{
    const date = new Date(ms)
    const day = date.getDay()
    const month = date.getMonth()+1
    const year = date.getFullYear()
    const hrs = date.getHours()
    const min = date.getMinutes()
    const sec = date.getSeconds()

    return `${day}/${month}/${year} ${hrs}: ${min} :${sec}`
}


const NoteDetail = (props) => {
     const headerHeight = useHeaderHeight()
     const [showmodel, setshowmodel] = useState(false)
     const [isEdit, setisEdit] = useState(false)
     const {setnotes} =useNotes()
     const [note, setNote] = useState(props.route.params.note);


     const displayDeleteAlert = () =>{

        Alert.alert("Are You Sure" , "This Will Delete You Note Permenantly" , [
            {
                text : 'Delete' , 
                onPress : deleteNote
            },
            {
                text : "No Thanks",
                onPress : () => console.log('no')
            }
        ],{
            cancelable : true
        })
    }
    
    const handleUpdate = async(title,  desc ,time )  =>{
        const result = await AsyncStorage.getItem('notes')
        let notes =[]
        if(result !== null)     
            notes= JSON.parse(result)

        const newnotes = notes.filter(n => {
            if(n.id === note.id){
                    n.title = title,
                    n.desc = desc,
                    n.isUpdated = true,
                    n.time = time
                    setNote(n);
            }
            return n
        })
        setnotes(newnotes)
        await AsyncStorage.setItem('notes' , JSON.stringify(newnotes))
        }

        const deleteNote = async () => {
            const result = await AsyncStorage.getItem('notes');
            let notes = [];
            if (result !== null) notes = JSON.parse(result);
            const newNotes = notes.filter(n => n.id !== note.id);
            setnotes(newNotes);
            await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
            props.navigation.goBack();
          };
    const handleOnClose = () => setshowmodel(false)
    
    const openEditModal = () =>{
        setisEdit(true)
        setshowmodel(true)
    }

     return (    
         <>
        <ScrollView contentContainerStyle={[styles.container , {paddingTop : headerHeight}]}>
                <Text style={styles.time}>
                    {`Created at ${formatDate(note.time)}`}
                </Text>
                <Text style={styles.title}>
                    {note.title}
                </Text>
                <Text style={styles.desc}>
                    {note.desc}
                </Text>  
            </ScrollView>
                <View style={styles.btncontainer}>
                        <RoundIconBtn 
                            onPress={displayDeleteAlert}
                            antIconName='delete' 
                            style={{backgroundColor : Color.Error , marginBottom : 15}}/>
                        <RoundIconBtn 
                            antIconName='edit' 
                            onPress={openEditModal}/>
                </View>
                <NoteInputModal 
                    isEdit={isEdit} 
                    note ={note} 
                    onClose={handleOnClose} 
                    onSubmit={handleUpdate} 
                    visible={showmodel}/>
                </>
    )
}
const styles = StyleSheet.create({
    container :  {
       // flex : 1,
        paddingHorizontal: 15
    },
    title :  {
        fontSize :30,
        color : '#dbb2ff',
        fontWeight : "bold",
    },
    desc : {
        fontSize : 20,
        opacity : 0.7
    }, 
    time : {
        textAlign : "right",
        fontSize : 12,
        opacity : 0.5
    },
    btncontainer : {
        position  :'absolute',
        right : 15,
        bottom : 50,
    }
})
export default NoteDetail
