import React from 'react';
import '../App.css';
import {Link, Redirect} from 'react-router-dom';
import GridLoader from "react-spinners/GridLoader";
import QRCode from "react-qr-code";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import {OverlayTrigger,Popover,Button} from 'react-bootstrap'
import copy from 'copy-to-clipboard';
import openSocket from 'socket.io-client';
const socket = openSocket('https://ctrl-c-b.herokuapp.com/')

class CopiedText extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id:false,
      session:true,
      ct:[],
      open:false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

 async onUnload(e){ // the method that will be used for both add and remove event
    e.preventDefault();
    socket.emit('window_closed',localStorage.getItem('userId'))
    console.log('Closed')
    e.returnValue = '';
 }
 handleClick = () => {
  this.setState({open:true})
};

handleClose = () => {
  this.setState({open:false})
};

async componentDidMount(){
        socket.emit('newUser',localStorage.getItem('userId'))
        await axios.get(`https://ctrl-c-b.herokuapp.com/user/${localStorage.getItem('userId')}`)
              .then((res)=>this.setState({ct:res.data.text}))
              .catch(err => this.setState({session:false}))
        window.addEventListener("unload", this.onUnload);
        socket.on('new',async ()=>{
          await axios.get(`https://ctrl-c-b.herokuapp.com/user/${localStorage.getItem('userId')}`)
              .then((res)=>this.setState({ct:res.data.text}))
        })
  } 

  componentWillUnmount() {
    window.removeEventListener("unload", this.onUnload);
  }

  render(){
    if(this.state.session)
      return(
          <div className = "main">
            <div className = "header" >
                <div>
                    <h1 style = {{color:'#fff',fontSize:40,fontFamily:'Courier'}}>Ctrl-C</h1>
                </div>
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    overlay={
                      <Popover>
                        <Popover.Content>
                          <QRCode value={localStorage.getItem('userId')} size = {200} bgColor = '#022140' fgColor = "#379683" />
                        </Popover.Content>
                      </Popover>
                    }
                  >
                    <Button variant="primary" style = {{backgroundColor:'#022140',color:'#fff' ,borderColor:'#379683'}}>QrCode</Button>
                  </OverlayTrigger>
            </div>
            <hr style = {{width:window.innerWidth}}/>
            <div className = "body">
                {this.state.ct.slice(0).reverse().map((p,index)=>(
                  <div>
                    <div className="info" onClick = {()=>{copy(p);this.handleClick()}}>
                      <p>{p}</p>
                    </div>
                  </div>
                ))}
            </div>
            <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={1000}
        onClose={this.handleClose}
        message="Text Copied"
      />
          </div>
      )
    else return(<Redirect to ='/'/>)
  }
}

export default CopiedText;
