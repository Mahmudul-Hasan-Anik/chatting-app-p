import React, { Component } from 'react'
import Friends from './Friends'
import Group from './Group'
import { Container,Button,Accordion,Badge } from 'react-bootstrap'

export default class Slidder extends Component {
    render() {
        return (
            <Container>
               <h2 className='mt-3'>Chat </h2>
               <p>Start New Conversation</p>
               
                <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        Friends  
                    </Accordion.Header>
                    {/* FRIEND SECTION */}
                    <Accordion.Body>
                        <Friends userName={this.props.userName}/>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Group
                    </Accordion.Header>
                    {/* GROUP SECTION */}
                    <Accordion.Body>
                        <Group userName={this.props.userName}/>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            </Container>
        )
    }
}
