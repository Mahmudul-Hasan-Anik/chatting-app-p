import React, { Component } from 'react'
import { getDatabase, ref, onChildAdded, onChildChanged } from '../../firebase'
import moment from 'moment'

export default class Massage extends Component {
    state = {
        textMassage: []  
    }

       //Show RealTime Data in Our window..
       componentDidUpdate(prevProps){
           const {group,groupId} = this.props
           //For massage======

           let massageArray = []
           const db = getDatabase()
           const massageRef = ref(db, 'massage/')

           onChildAdded(massageRef, (data)=>{
                data.forEach((item)=>{
                    massageArray.push(item.val())
                })
                if(prevProps.group){
                    if(prevProps.group.id !== groupId){
                        this.setState({textMassage:massageArray})
                    }    
                }
                // else{
                //     this.setState({textMassage:massageArray})
                // }               
           })

           onChildChanged(massageRef, (data)=>{
          
                data.forEach((item)=>{
                    massageArray.push(item.val())
                })
                if(prevProps.group){
                    if(prevProps.group.id !== groupId){
                        this.setState({textMassage:massageArray})
                    }   
                }
                // else{
                //     this.setState({textMassage:massageArray})
                // }
           })
       }
    
    render() {
       const {textMassage} = this.state
       const {group,userName,groupId} = this.props

        return (
            <div style={mainDiv} className='mt-2'>
              {textMassage.map((item)=>(
                   item.groupName == groupId?
                  <div style={designDiv}>
                      <div style={userName.uid == item.sender ? right : left}>

                      <p>{moment(item.date).fromNow()}</p>
                      <p style={userName.uid == item.sender? design:notDesign}>{item.outputMassage}</p>
                      </div>
                      
                  </div>
                  :''
                ))}
            </div>
        )
    }
}

const mainDiv = {
   height:'380px',
   background: 'white',
   overflowY:'scroll',
}
const designDiv = {
    padding:'10px', 
    margin:'5px'
}
const right = {
    textAlign:'right',
    marginLeft:'50%',
}
const left = {
    textAlign:'left',
    display:'inline-block',
}
const design = {
    background:'skyblue', 
    display:'inline-block',
    padding:'5px 15px',
    borderRadius:'5px',
}
const notDesign = {
    background:'pink', 
    display:'inline-block',
    padding:'5px 15px',
    borderRadius:'5px',
}