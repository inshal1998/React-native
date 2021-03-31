import React, { useEffect, useState } from 'react'
import { View, Text,Modal, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Color from '../misc/Color'
import RoundIconBtn from './RoundIconBtn'

const NoteInputModal = ({visible , onClose , onSubmit ,isEdit , note}) => {
    const [title, settitle] = useState('')
    const [desc, setdesc] = useState('')
    
    const keybodDismiss = () =>{
        Keyboard.dismiss()
    }

    useEffect(() => {
        if(isEdit){
            settitle(note.title)
            setdesc(note.desc)
        }
    }, [isEdit])
    const handleOnChangeText = (text, valueFor) =>{
            if (valueFor === 'title') {
                settitle(text)
            }
            if(valueFor === 'description'){
                setdesc(text)
            }
    }

    const handleSubmit = () =>{
            if(!title.trim() && !desc.trim()){
                return onClose()
            }
            if (isEdit) {
                onSubmit(title , desc, Date.now())
            }
            else{
                onSubmit(title,desc)
                settitle('')
                setdesc('')
            }
            onClose()
    }
    const closeModal = () =>{
        if(!isEdit){
            settitle('')
            setdesc('')
        }
        onClose()
    }

    return (
        <Modal visible={visible} animationType="fade">
            <View style={styles.container}>
                <TextInput 
                    value={title}
                    onChangeText={(text)=>{handleOnChangeText(text, 'title')}}
                    placeholder ="Title"
                    style = {[styles.txtinput , styles.title]}
                />
                <TextInput
                    value={desc}
                    onChangeText={(text)=>{handleOnChangeText(text, 'description')}}
                    multiline
                    placeholder ="Description"
                    style = {[styles.txtinput , styles.description]}
                />
                
                <View style={styles.btnContainer}>
                    <RoundIconBtn 
                        size={15} 
                        antIconName="check" 
                        onPress={handleSubmit}
                    />
                    {title.trim() || desc.trim() ? 
                        (
                            <RoundIconBtn 
                                onPress={closeModal}
                                size={15} 
                                style={{marginLeft : 15}}  
                                antIconName="close"
                            />
                        )
                        : null
                    }
                </View>
            </View>
            <TouchableWithoutFeedback onPress={keybodDismiss}>
                <View style={[styles.modalBG , StyleSheet.absoluteFillObject]}/>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    txtinput : {
        fontSize :20,
        color : Color.Dark,
        borderBottomWidth : 2,
        borderBottomColor : Color.Primary,
    },
    description  :{
        height :100,
    },
    title : {
        height :40,
        marginBottom: 15,
        fontWeight :"bold"
    },
    container : {
        paddingHorizontal :20,
        paddingTop:15,
    },
    modalBG : {
        flex : 1,
        zIndex : -1
    },
    btnContainer :{
        flexDirection:"row",
        justifyContent : "center",
        paddingVertical:15,
    }
})
export default NoteInputModal
