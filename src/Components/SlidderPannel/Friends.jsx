import React, { Component } from 'react'
import { Row,Col,Form,Button,ListGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {getDatabase, ref, push, set,onValue} from '../../firebase'
import { connect } from 'react-redux'
import {setUser} from '../../Action/Main'

class Friends extends Component {
    state = {
        friend:[],
        active:''
    }
    handleChange = (e)=>{
        this.setState({[e.target.type]:e.target.value})
    }

    componentDidMount(){
        const friendAfterLoad = []
        const db = getDatabase();
        const friendRef = ref(db, 'users');
        
        onValue(friendRef, (snapshot) => {
          snapshot.forEach((item) => {
            const friendData = {
                id: item.key,
                name: item.val().username
                
            }
            friendAfterLoad.push(friendData)
          });
          this.setState({friend:friendAfterLoad})
        })
    }
 

    // friendChange = (friend)=>{
    //     this.props.setUser(friend)
    //     this.setState({active:friend.id})
    // }

    render() {
        const {friend,active} = this.state
        return (
            <>
            <Row className='mb-3'>
                <Col xs={9}>
                <Form>
                    <Form.Control type="Search" placeholder="Search Friends" onChange={this.handleChange}/>
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
                    {friend.map((item)=>(

                    <ListGroup.Item action onClick={()=>(this.friendChange(item))} >
                        {item.name}
                    </ListGroup.Item>
                    ))}
                </ListGroup>
            </Row>
            </>
        )
    }
}

export default connect(null, {setUser})(Friends)