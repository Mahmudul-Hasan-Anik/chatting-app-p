import React, { Component } from 'react'
import Registration from "./auth/Registration";
import Login from "./auth/Login";
import Home from './Components/Home';
import { BrowserRouter,Routes,Route,Navigate  } from "react-router-dom";
import {auth,onAuthStateChanged} from './firebase'

export default class App extends Component{
  state = {
    checking: false
  }

  componentDidMount(){
    auth.onAuthStateChanged((user) => {
      if (user) {
       this.setState({checking:true})
      } else {
       this.setState({checking:false})
      }
    });
  }
  render(){
    const {checking} = this.state
    return (
      <>
      <BrowserRouter>
      {checking?
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/registration" element={<Navigate to='/login' />}/>
          <Route path="/login" element={<Navigate to='/' />}/>
        </Routes>
      :
        <Routes>
          <Route path="/" element={<Navigate to='/login' />}/>
          <Route path="/registration" element={<Registration />}/>
          <Route path="/login" element={<Login />}/>
        </Routes>
      }

       
      </BrowserRouter>  
      </>
    
    
    
      );
  }
}


