import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React,{useState,useEffect,useRef} from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, Text, View ,Dimensions,TextInput,TouchableOpacity} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import openSocket from 'socket.io-client';

export default function LinksScreen({route,navigation}) {
  const animation = useRef(null)
  const socket = openSocket('https://ctrl-c-b.herokuapp.com')
  const [text,setText] = useState('')
  const [pastes,setPaste] = useState([])
  const arr = [
    'Hello','Hi','Helllllooooo'
  ]
  const handlePaste = async() =>{
    await axios.patch(`https://ctrl-c-b.herokuapp.com/user/${route.params.userId}`,{
      "text":text
    })
    .then(()=>socket.emit('sent',route.params.userId))
    .then(async ()=> await setPaste(oldArray => [...oldArray,text]))
    .then(()=>console.log(pastes))
    .catch(err=>console.log(err))
  }
  useEffect(() => {
    setPaste([])
  }, [route.params.userId]); 
  return (
    <View style={styles.container}>
      <View style = {{width:Dimensions.get('window').width,alignSelf:'center',backgroundColor:'#81efdf',borderBottomRightRadius:100,paddingBottom:20}}>
        <TextInput placeholder = 'Type...' placeholderTextColor='#002140' onChangeText = {(e)=>setText(e)} style = {{fontSize:18,marginLeft:20,marginTop:'10%',borderBottomWidth:4,borderBottomColor:'#022140',width:'50%'}}/>
        <TouchableOpacity onPress = {()=>handlePaste()} style = {{alignSelf:'flex-end',marginRight:'10%',borderWidth:4,paddingHorizontal:8,borderRadius:20}}>
          <Text style = {{fontSize:22,fontWeight:"bold"}}>Paste</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
      {
      pastes.length == 0 ?
      <View>
      <LottieView
          style={{
            width: 300,
            height: 300,
            alignSelf:'center',
            justifyContent:'center'
          }}
          ref = {animation}
          source={require('../assets/img.json')}
        />
        <Text style = {{textAlign:'center',fontSize:18,color:'#fff',marginVertical:30}}>
          Scan to start using
        </Text>
        <Text style = {{textAlign:'center',fontSize:18,color:'#fff'}}>
          Press Start on Web Client
        </Text>
        </View>:
          pastes.slice(0).reverse().map((p,index)=>{return(
            <View style = {{backgroundColor:'#ececec',paddingVertical:20}}>
              <Text style = {{marginLeft:10,fontSize:18,color:'#022140',marginBottom:10}}>{p}</Text>
            </View>)
        })
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022140'
  },
  contentContainer: {
    paddingTop: 15,
  },

});
