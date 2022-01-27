import React, { Component } from 'react'
import { Navbar,Container,Form,Button,Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane,faPlus  } from '@fortawesome/free-solid-svg-icons'
import { getDatabase, ref, push, set,child } from '../../firebase'


export default class MassageFrom extends Component {
    state = {
        show: false,
        massage:''
    }
 //MODAL BUTTON OPEN AND CLOSE FUNCTION START
   handleClose = () => {
       this.setState({show:false})
   }
   handleShow = () => {
     this.setState({show:true})
   }
 //MODAL BUTTON OPEN AND CLOSE FUNCTION END
   handleChange = (e)=>{
     this.setState({[e.target.name]:e.target.value})   
   }

   handleSubmit = (e)=>{
       const {massage} = this.state
       const {userName,group,groupId} = this.props
       e.preventDefault()

       if(this.isEmpty(this.state)){

        const db = getDatabase();
        const massageRef = ref(db, 'massage/');
        const newMassageRef = push(child(massageRef, `${groupId}`))
        set(newMassageRef, {
            outputMassage : massage,
            sender: userName.uid,
            groupName: groupId,
            senderName: userName.displayName,
            date: Date()
        }).then(()=>{
            this.setState({massage:''})
        }) 
    }
   }

    isEmpty = ({massage})=>{
        if(massage.length == ''){
            return false
        }else{
            return true
        }
    }

// RENDER DATA START HERE.....
    render() {
        const {show,massage} = this.state
        return (
            <>
            <Navbar bg='light'  className='mt-1' style={{height:'80px'}}>
                <Container>
                <Form style={{width:'85%'}}>
                    <Form.Control type="text" placeholder="Write Your Massage..." onChange={this.handleChange} value={massage} name='massage' style={{border:'none',background:'#F8F9FA'}}/>
                </Form>
                <Button onClick={this.handleSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane} />
                </Button>
                <Button onClick={this.handleShow}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
                </Container>
            </Navbar>

            {/* ================ MODAL PART ================= */}
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Upload Picture</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="file" />
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
