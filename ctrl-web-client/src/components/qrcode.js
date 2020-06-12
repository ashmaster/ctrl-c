import React from 'react';
import '../App.css';
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom'
import GridLoader from "react-spinners/GridLoader";
import QRCode from "react-qr-code";
import {Button} from 'react-bootstrap'
class QrCode extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        pressed:false,
        sessionId:'',
        id:false
    }
  }
  clicked(){
    console.log('Clicked')
  }

async  componentDidMount(){
        this.setState({loading:true})
        await axios.post('https://ctrl-c-b.herokuapp.com/user')
        .then(res=>this.setState({sessionId:res.data._id,loading:false}))
        .catch(err=>console.log(err))
        localStorage.setItem('userId',this.state.sessionId)
  }

  render(){
        if(this.state.loading)
            return(
            <div className = "App-header">
                <div>
                    <h1 style = {{color:'#fff',fontSize:40,fontFamily:'Courier'}}>Ctrl-C</h1>
                </div>
                <hr style = {{width:window.innerWidth}}/>
                <GridLoader
                size={70}
                color={"#379683"}
                loading={this.state.loading}
                />
            </div>
            )
        else return(
            <div className = "App-header">
                <div>
                    <h1 style = {{color:'#fff',fontSize:40,fontFamily:'Courier'}}>Ctrl-C</h1>
                </div>
                <hr style = {{width:window.innerWidth}}/>
                <h2 className = "Instr" style = {{textAlign:"center"}}>Scan QR using Android Client and press Next</h2>
                    <QRCode value={this.state.sessionId} bgColor = '#022140' fgColor = "#379683" />
                <Link to = '/ct'>
                <Button className = "button button2" style = {{marginTop:10}} variant="primary" size="lg">
                  Start
                </Button></Link>
            </div>
        )
  }
}

export default QrCode;
