import React, { Component } from 'react'
import { Navbar,Container,Dropdown,Button,Form,Modal } from 'react-bootstrap'
import Chater from '../../Image/chater.png'
import { signOut,auth } from '../../firebase'

export default class Header extends Component {
    state = {
        show: false,
        uploadFile:''
    }

    //SIGN OUT PART
    handleSignOut = ()=>{
        signOut(auth).then(() => {
        console.log('out hoice')
        }).catch((error) => {
          console.log(error)
        });
    }
   // MODAL AND FROM PART
   handleClose = () => {
       this.setState({show:false})
   }
   handleShow = () => {
     this.setState({show:true})
   }
   handleFile = (e)=>{
       this.setState({uploadFile:e.target.files[0].name})
   }
    render() {
        const {show} = this.state
        return (
            <>
            <Navbar sticky="top" variant="light" style={{background:'#98BAE7', color:'white'}}>
            <Container>
                <Navbar.Brand>
                    <img src={Chater} alt="" />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <Dropdown >
                    
                    <Button variant="light">{this.props.userName ? `${this.props.userName.displayName}`:``}</Button>
                    <Dropdown.Toggle variant="dark" />
                    <Dropdown.Menu className="super-colors">
                    <Dropdown.Item onClick={this.handleShow}>Change Profile Picture</Dropdown.Item>
                    <Dropdown.Item >Setting and Privacy</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={this.handleSignOut}>Log Out</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Text>
                </Navbar.Collapse>
            </Container>
            </Navbar>


             {/* ================ MODAL PART ================= */}
         <Modal show={show} onHide={this.handleClose}>
             <Modal.Header closeButton>
             <Modal.Title>Upload Profile Picture</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <input type="file" onChange={this.handleFile}/>
             </Modal.Body>
             <Modal.Footer>
             <Button variant="secondary" onClick={this.handleClose}>
                 Close
             </Button>
             <Button variant="primary" onClick={this.handleClose}>
                 Save Changes
             </Button>
             </Modal.Footer>
         </Modal>
         </>
        )
    }
}
