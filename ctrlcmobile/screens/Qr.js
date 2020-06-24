import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export default class Qr extends React.Component{
    constructor(props){
        super(props);
    }
    storeData = async (value) => {
        try {
          await AsyncStorage.setItem('userId', value)
        } catch (e) {
          console.log(e)
        }
      }
    onSuccess = e => {
        console.log(e.data)
        axios.get(`https://ctrl-c-b.herokuapp.com/user/${e.data}`).then(()=>this.storeData(e.data)).then(()=>this.props.navigation.navigate('CameraScreen',{text:'hello'})).catch(err=>this.retry())
      };
    retry = () => {
        this.scanner.reactivate()
    }
    componentDidMount(){
        this.props.navigation.addListener('focus', () => {
            this.retry()
       });
     }
    render(){
        return (
            <View style = {styles.body}>
                <StatusBar hidden = {false} backgroundColor = '#022140'/>
                <QRCodeScanner
                ref={(node) => { this.scanner = node }}
                onRead={this.onSuccess}
                topContent={
                <Text style={styles.centerText}>
                    Go to{' '}
                    <Text style={styles.textBold}>Ctrl-C Client</Text> on
                    your computer and scan the QR code.
                </Text>
                }
                bottomContent={
                <TouchableOpacity onPress = {this.retry} style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>Retry</Text>
                </TouchableOpacity>
                }
            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#022140'
    },
    text:{
        color:'#fff'
    },
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 32,
        color: '#777'
      },
      textBold: {
        fontWeight: '500',
        color: '#000'
      },
      buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
      },
      buttonTouchable: {
        padding: 16
      }

})