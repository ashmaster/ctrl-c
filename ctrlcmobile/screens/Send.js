import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-community/async-storage';
import openSocket from 'socket.io-client';
import axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
const socket = openSocket('https://ctrl-c-b.herokuapp.com')
export default class Send extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userId:null,
            text:''
        }
    }
    getData = async () => {
        try {
          const value = await AsyncStorage.getItem('userId')
          if(value !== null) {
            this.setState({userId:value})
          }
        } catch(e) {
          console.log(e)
        }
      }
      handlePaste = async() =>{
        await axios.patch(`https://ctrl-c-b.herokuapp.com/user/${this.state.userId}`,{
          "text":this.state.text
        })
        .then(()=>socket.emit('sent',this.state.userId))
        .catch(err=>console.log(err))
      }
    componentDidMount(){
       this.getData() 
       this.props.navigation.addListener('focus', () => {
        this.setState({text:this.props.route.params.text})
      });
    }
    render() {
        return (
            <View style={styles.container}>
            <StatusBar hidden = {false} backgroundColor = '#022140'/> 
      <View style = {{width:Dimensions.get('window').width,alignSelf:'center',backgroundColor:'#81efdf',borderBottomRightRadius:100,paddingBottom:20}}>
        <TextInput multiline editable placeholder = 'Text....' value={this.state.text} placeholderTextColor='#fff' onChangeText = {(e)=>this.setState({text:e})} style = {{fontSize:18,marginHorizontal:20,marginTop:'10%',color:'#fff',backgroundColor:'#022140',borderBottomWidth:4,borderBottomColor:'#022140',maxHeight:Dimensions.get('window').height/2}}/>
        <View style = {{flexDirection:'row',justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('CameraScreen')} style = {{alignSelf:'flex-end',marginRight:'10%',marginTop:20,backgroundColor:'#022140',padding:10,borderWidth:4,borderRadius:30}}>
        <Icon name="md-camera" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.setState({text:''})} style = {{alignSelf:'flex-end',marginRight:'10%',marginTop:20,borderWidth:4,backgroundColor:'#022140',borderRadius:30,padding:10,paddingHorizontal:15}}>
            <Icon name="md-close" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>this.handlePaste()} style = {{alignSelf:'flex-end',marginRight:'10%',marginTop:20,borderWidth:4,backgroundColor:'#022140',borderRadius:30,padding:10}}>
            <Icon name="md-send" size={30} color="#fff" />
        </TouchableOpacity>
        </View>
      </View>
    </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#022140'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
      },
  
  });