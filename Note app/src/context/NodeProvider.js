import AsyncStorage from '@react-native-async-storage/async-storage'
import React , { useContext, useState,createContext, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NoteContext = createContext()
const NodeProvider = ({children}) => {
    const [notes, setnotes] = useState([])

    const findNotes = async () =>{
        const results = await AsyncStorage.getItem('notes')
        if(results !== null) setnotes(JSON.parse(results))
    }
    
    useEffect(() => {
        findNotes()
    }, [])

    return (
        <NoteContext.Provider value={{notes , setnotes , findNotes}}>
            {children}
        </NoteContext.Provider>
    )
}

export const useNotes = () => useContext(NoteContext)

export default NodeProvider
