import React, { Component } from 'react'
import { ListGroup,Row, Form, Button, Col,Modal ,Alert} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAdd } from '@fortawesome/free-solid-svg-icons'
import {getDatabase, ref, push, set,onValue} from '../../firebase'
import { setcurrentgroup } from '../../Action/Main'
import { connect } from 'react-redux'

class Group extends Component {
        state = {
            show: false,
            group:[],
            groupName:'',
            tagline:'',
            uploadFile:'',
            errorMsg:'',
            active:'',
            firstLoad:''
        }
    
    CloseModal = () => {
        this.setState({show:false})
    }
    ShowModal = () => {
        this.setState({show:true})
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    handleFile = (e)=>{
        console.log(e.target.files[0].name)
        this.setState({uploadFile:e.target.files[0].name})
    }

    isEmpty = ({groupName,tagline})=>{
       if(groupName && tagline){
           return true
       }else{
           return false
       }
    }

    handleGroup = (e)=>{
        e.preventDefault()
        const {groupName,tagline} = this.state 
        const {userName} = this.props

        if(this.isEmpty(this.state)){
            // Create a new post reference with an auto-generated id
            const db = getDatabase();
            const groupRef = ref(db, 'Group');
            const newGroupRef = push(groupRef);
            set(newGroupRef, {
                groupName: groupName,
                tagline: tagline,
                createdBy: userName.displayName,
            }).then(()=>{
                this.setState({show:false})
                this.setState({groupName:''})
                this.setState({tagline:''})
                this.setState({errorMsg:''})
            })
        }else{
            this.setState({errorMsg:'Fill All input'})
        }
    }

    // READ DATA FROM FIREBASE REALTIME
    componentDidMount(){
        const groupAfterLoad = []
        const db = getDatabase();
        const groupRef = ref(db, 'Group');
        
        onValue(groupRef, (snapshot) => {
          snapshot.forEach((item) => {
            const groupData = {
                id: item.key,
                groupName: item.val().groupName,
                tagline: item.val().tagline,
                Creator: item.val().createdBy
            }
            groupAfterLoad.push(groupData)
          });
          this.setState({group:groupAfterLoad},this.addFirstGroup)
        })
    }

    addFirstGroup = ()=>{
        const {firstLoad,group} = this.state
        const firstGroup = this.state.group[0]
        if(firstLoad && group.length > 0){
            this.props.setcurrentgroup(firstGroup)
            this.setState({active:firstGroup.id})
        }
        this.setState({firstLoad:false})
    }

    groupChange = (group)=>{
        this.props.setcurrentgroup(group)
        this.setState({active:group.id})
    }

    render() {
        const {show,groupName,tagline,uploadFile,errorMsg,group,active} = this.state
        return (
            <>
            <Row className='mb-3'>
                <Button style={{width:'240px',color:'white'}} variant='dark' onClick={this.ShowModal}>
                    <span style={{marginRight:'40px'}}>Create New Group</span>
                    <FontAwesomeIcon icon={faAdd} />
                </Button>
            </Row>

            <Row className='mb-3'>
                <Col xs={9}>
                <Form>
                    <Form.Control type="search" name='search' placeholder="search group" onChange={this.handleChange} />
                </Form>
                </Col>
                <Col xs={3}>
                    <Button variant='dark'>
                    <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </Col>
            </Row>
    {/* IMPORTANT PART */}
            <Row>
                <ListGroup>
                    {group.map((item)=>(

                    <ListGroup.Item action onClick={()=>(this.groupChange(item))} style={item.id == active? Active: notActive}>
                        {item.groupName}
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>


             {/* ================ MODAL PART ================= */}
             <Modal show={show} onHide={this.CloseModal}>
                    <Modal.Header>
                    <Modal.Title>Create New Group</Modal.Title>
                    </Modal.Header>
            {/* ERROR MASSAGE PART */}
                    {errorMsg?<Alert  variant='danger'>{errorMsg}</Alert>:''}
           {/* CREATE GROUP FROM PART */}
                    <Modal.Body> 
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control name='groupName' type="text" placeholder="Group Name" onChange={this.handleChange} value={groupName}/>  
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>Group TagLine</Form.Label>
                            <Form.Control name='tagline' type="text" placeholder="Group TagLine" onChange={this.handleChange} value={tagline}/>
                        </Form.Group>

                        {/* <Form.Group className="mb-2">
                            <Form.Label>Set a group Picture</Form.Label>
                            <Form.Control type="file" onChange={this.handleFile} value={uploadFile}/>
                        </Form.Group> */}
                      
                    </Form>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.CloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleGroup} >
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

const Active = {
    background:'skyblue',
    color:'white'
}
const notActive = {
    background:'white',
}

export default connect(null, {setcurrentgroup})(Group)