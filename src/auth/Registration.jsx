import React, { Component } from 'react'
import { Button,Form,Container,Row,Col,Alert,Spinner } from 'react-bootstrap';
import Two from '../Image/Two.png'
import Chater from '../Image/chater.png'
import { auth, createUserWithEmailAndPassword, updateProfile,getDatabase, ref, set  } from '../firebase';
import { Link } from 'react-router-dom';

export default class Registration extends Component {
    state = {
        name:'',
        email:'',
        password:'',
        confromPassword:'',
        errorMsg:'',
        successMsg:'',
        loading:''
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value}) 
    }
   
    isEmpty = ({name,email,password,confromPassword})=>{
        if(!name.length || !email.length || !password.length || !confromPassword.length){
           this.setState({errorMsg:'Please Fill all input box'})
        }else if(password.length < 6 || confromPassword < 6){
            this.setState({errorMsg:'Password Must be 6 character or more'})
        }
        else if(password != confromPassword){
            this.setState({errorMsg:'Password Not Matched'})
        }else{
            return true
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault() 
        const {email,password,name} = this.state

        if(this.isEmpty(this.state)){
            this.setState({loading:true})

            createUserWithEmailAndPassword(auth, email, password)
            .then((user)=>{
                console.log(user)
                updateProfile(auth.currentUser, {
                    displayName: name, 
                    // photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(()=>{
                    this.writeUserData(user)
                })
         
            
            .then(() => {
                this.setState({name:''})
                this.setState({email:''})
                this.setState({password:''})
                this.setState({confromPassword:''})
                this.setState({successMsg:'Your Registration is successful'})
                this.setState({errorMsg:''})
                this.setState({loading:''})
            })
        })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                this.setState({name:''})
                this.setState({email:''})
                this.setState({password:''})
                this.setState({confromPassword:''})
                this.setState({successMsg:''})

                if(errorMessage.includes('email')){
                    this.setState({errorMsg:'This Email Already Used...'})
                }
            });
        }
    }

    //RealTime DataBase Start Here..
    writeUserData(user) {
        const {name, email} = this.state
        console.log(user.user.uid)
        const db = getDatabase();
        set(ref(db, 'users/' + user.user.uid), {
          username: name,
          email: email,
        });
      }
    //RealTime DataBase End Here

    render() {
        const {email,password,confromPassword,name,errorMsg,successMsg,loading} = this.state
        return (
        <>
        <Container style={{marginTop:'20px'}}>
        
        <Row >
            <Col sm={4}>
            <img src={Chater}  />
            <h4 className='mt-3'>Hello Everyone , We are Chitchat</h4>
            <p>Welcome to chitchat please Register to your account.</p>
            
            {errorMsg?<Alert variant='danger'>{errorMsg}</Alert>:''}
            {successMsg?<Alert variant='success'>{successMsg}</Alert>:''}
            


            <Form style={{width:'300px',fontWeight:'600'}} onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3">
                    <Form.Label>User name</Form.Label>
                    <Form.Control name='name' type="text" placeholder="Enter Name" onChange={this.handleChange} value={name}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" onChange={this.handleChange} value={email}/>
                </Form.Group>
                

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" onChange={this.handleChange} value={password}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confrom Password</Form.Label>
                    <Form.Control name='confromPassword' type="password" placeholder="Confrom Password" onChange={this.handleChange} value={confromPassword}/>
                </Form.Group>
                {/* BUTTON PART */}
                    <Button variant="primary" style={{width:'100%',padding:'10px',marginTop:'20px'}} onClick={this.handleSubmit} className={loading?'disabled':''}>
                        {loading?<Spinner animation="border" />:'Registration'}
                    </Button>
            </Form>
            <p style={{paddingTop:'20px'}}>Already have an account? {' '}
                <Link to="/login">Login</Link> 
            </p>
            </Col>

            <Col sm={8}>
                <img src={Two} alt="" style={{width:'100%',height:'95%'}}/>
            </Col>
        </Row>
        </Container>
        </>
        )
    }
}
