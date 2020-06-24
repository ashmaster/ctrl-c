import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  BackHandler,
  Dimensions,
  Vibration

} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RNCamera } from 'react-native-camera';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class CameraScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:null,
            textDetect:true
        }

    }
    takePicture = async () => {
        if (this.camera) {
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          const processed = await vision().textRecognizerProcessImage(data.uri);
          console.log('Found text in document: ', processed);
        }
      };

      componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", ()=> BackHandler.exitApp());
      }
    
      componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress",()=> BackHandler.exitApp());
      }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden />
                <RNCamera
                  ref={(ref) => {
                    this.camera = ref;
                  }}
                  style={styles.preview}
                  onTextRecognized={  this.state.textDetect ? (text) => {
                    if(!text.textBlocks.length==0){
                      var main = '';
                      Vibration.vibrate(500)
                      text.textBlocks.map(p=>main=main.concat('\n',p.value))
                      console.log('main value:',main);
                        this.setState({text:main,textDetect:false})
                    }
                    else{
                        null
                    }
                  }:null
                  }
                  type={RNCamera.Constants.Type.back}
                  androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                  }}
                >
                <View style = {{paddingLeft:10,height:Dimensions.get('window').height/2}}>
                <ScrollView>
                {this.state.text!==null?<Text selectable={true} style = {{fontWeight:'bold',color:'#fff'}}>{this.state.text}</Text>:null }
                </ScrollView></View>
                <View style = {{flexDirection:'row'}}>
                    <TouchableWithoutFeedback onPress={()=>this.setState({textDetect:true,text:null})} style={styles.capture}>
                        <Icon name="md-refresh" size={40} color="#fff" />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={()=>this.props.navigation.navigate('Send',{text:this.state.text})} style={styles.capture}>
                        <Icon name="md-send" size={40} color="#fff" />
                    </TouchableWithoutFeedback>
                  </View>
                </RNCamera>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
      borderColor:'#63e8a8',
      borderWidth:5
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });