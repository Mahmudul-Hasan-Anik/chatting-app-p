import React, { Component } from 'react'
import { Navbar,Container,Button } from 'react-bootstrap'
import user from '../../Image/user.jpg'
import Massage from './Massage'
import MassageFrom from './MassageFrom'

export default class Massagebody extends Component {
    render() {
        const {group} = this.props
       
        return (
            <>
            <Navbar bg="light" className='mt-3'>
                <Container>
                <Navbar.Brand>
                    <img src={user} width="50" height="50" alt='image'/>{' '}
                     <span>Mahmudul Hasan</span>
                </Navbar.Brand>
                <Button variant="info" style={{color:'white'}}>Active</Button>
                </Container>
            </Navbar>

            <Massage userName={this.props.userName} group={this.props.group} groupId={this.props.groupId}/>
            <MassageFrom userName={this.props.userName} group={this.props.group} groupId={this.props.groupId}/>
            </>
        )
    }
}
