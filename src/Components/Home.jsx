import React, { Component } from 'react'
import Massagebody from './MassagePannel/Massagebody'
import {Row,Col} from 'react-bootstrap'
import Header from './NavHeader/Header'
import Slidder from './SlidderPannel/Slidder'
import Meta from './MetaPannel/Meta'
import { auth } from '../firebase'
import { connect } from 'react-redux'
import {setUser,clearUser} from '../Action/Main'



class Home extends Component {

  componentDidMount(){

    auth.onAuthStateChanged((user)=>{
      if(user){
       this.props.setUser(user)
      }else{
        this.props.clearUser()
      }
     
    })
  }
    render() {
        return (
          <>
            <Header userName={this.props.userName}/>  
          <Row style={{height:'85vh'}}>
            <Col xs={3}>
              <Slidder userName={this.props.userName} group={this.props.group}/>
            </Col>

            <Col xs={6} style={{background:'#d2e2f1'}}>
               <Massagebody userName={this.props.userName} group={this.props.group} groupId={this.props.groupId}/>
            </Col>
              
            <Col xs={3}>
              <Meta userName={this.props.userName} group={this.props.group}/>
            </Col>
          </Row>
        </>
        )
    }
}

const mapStateToProps = (state)=>({
  Loading: state.user.Loading,
  userName: state.user.currentUser,
  group: state.group.currentgroup,
  groupId: state.group.currentGroupId
})


export default connect(mapStateToProps, {setUser,clearUser})(Home)