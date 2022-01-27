import React, { Component } from 'react'

export default class Meta extends Component {
    render() {
        const {group} = this.props
        return (
            <div className='mt-3' style={{textAlign:'center'}}>
               {group? 
                 <>
                 <h5><span style={{color:'skyblue'}}>Group Name:</span><br/> {group.groupName}</h5>
                 <h5><span style={{color:'skyblue'}}>Group tagline:</span><br/> {group.tagline}</h5>
                 <h5><span style={{color:'skyblue'}}>Group Creator:</span><br/> {group.Creator}</h5>
                 </>
                 :
                ``
                }
            </div>
        )
    }
}
