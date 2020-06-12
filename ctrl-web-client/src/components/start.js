import React from 'react';
import '../App.css';
import {Link,Redirect} from 'react-router-dom';
import {Button} from 'react-bootstrap'

class Start extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id:false
    }
  }
  render(){
      return(
        <div className = "App-header">
          <div>
              <h1 style = {{color:'#fff',fontSize:40,fontFamily:'Courier'}}>Ctrl-C</h1>
          </div>
          <hr style = {{width:window.innerWidth}}/>
          <div className = "Start">
            <Link className = "startlink" to = '/qrcode'>
                <Button className = "button button2" variant="primary" size="lg">
                  Start
                </Button>
            </Link>
          </div>
        </div>
      )
  }
}

export default Start;
