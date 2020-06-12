import * as WebBrowser from 'expo-web-browser';
import React,{useEffect,useState} from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View,Button,Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios'

import { MonoText } from '../components/StyledText';

export default function HomeScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [userId,setUserId] = useState(0)

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setUserId(data)
    setScanned(true);
    axios.get(`https://ctrl-c-b.herokuapp.com/user/${data}`).then((res)=>console.log(navigation.navigate('Links',{userId:userId}))).catch(err=>alert('Wrong QrCode'))
  };

  if (hasPermission === null) {
    return <View style={styles.container}>
    <Text style = {{color:'#fff',textAlign:'center'}}>Requesting for camera permission</Text>
 </View>
    
  }
  if (hasPermission === false) {
    return <View style={styles.container}>
    <Text style = {{color:'#fff',textAlign:'center'}}>No access to camera</Text>
 </View>
    
  }
  return (
    <View style={styles.container}>
      <Text style = {{color:'#fff',textAlign:'center',marginTop:'10%'}}>Download Ctrl-C chrome extension and scan QrCode</Text>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#022140',
  },
});
