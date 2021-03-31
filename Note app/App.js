import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useEffect, useState} from "react";
import Intro from "./src/screens/Intro";
import NoteScreen from "./src/screens/NoteScreen";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import NoteDetail from "./src/components/NoteDetail";
import NodeProvider from "./src/context/NodeProvider";
const Stack = createStackNavigator();
export default function App() {
  const [user, setuser] = useState({})

  const findUser = async()=>{
    const result=await AsyncStorage.getItem('user')
    if(result !== null){
      setuser(JSON.parse(result))
    }
  } 

  useEffect(() => {
     findUser()
  }, [])

  const renderNoteScreen = (props) => (
    <NoteScreen {...props} user={user}/>
  )  

  if(!user.name) return <Intro onFinish={findUser}/>
  return (
    <NavigationContainer>
      <NodeProvider>
        <Stack.Navigator screenOptions={{headerTitle : '' , headerTransparent : true}}>
            <Stack.Screen component= {renderNoteScreen} name="NoteScreen"/>  
            <Stack.Screen component= {NoteDetail} name="NoteDetail"/>
        </Stack.Navigator>
      </NodeProvider>
    </NavigationContainer>
)

} 