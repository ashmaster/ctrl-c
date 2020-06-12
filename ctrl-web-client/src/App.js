import React from 'react';
import './App.css';
import Start from './components/start'
import QrCode from './components/qrcode'
import CopiedText from './components/ct'
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      userid:false
    }
  }


async componentDidMount(){
    const userid = localStorage.getItem('userId');
    if(userid!==null)
      this.setState({userid})
  }

  render(){
    return(
      <Router>
        <div>
          <Switch>
            <Route exact path = "/">
              <Start/>
            </Route>
            <Route path = "/qrcode">
              <QrCode/>
            </Route>
            <Route path = "/ct">
              <CopiedText/>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
