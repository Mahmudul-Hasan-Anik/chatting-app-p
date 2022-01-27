import React, { Component } from 'react'
import { Button,Form,Container,Row,Col,Alert,Spinner } from 'react-bootstrap';
import Three from '../Image/Three.png'
import Chater from '../Image/chater.png'
import { auth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,getDatabase, ref, set } from '../firebase';
import { Link } from 'react-router-dom';


export default class Login extends Component {
    state = {
        email:'',
        password:'',
        errorMsg:'',
        successMsg:'',
        loading:''
    }
    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value}) 
    }
    isEmpty = ({email,password})=>{
        if(!email.length || !password.length){
           this.setState({errorMsg:'Please Fill all input box'})
        }else{
            return true
        }
    }
    handleSubmit = (e)=>{
        e.preventDefault() 
        const {email,password} = this.state

        if(this.isEmpty(this.state)){
            this.setState({loading:true})

            signInWithEmailAndPassword(auth, email, password)
            .then((user) => {
                this.setState({email:''})
                this.setState({password:''})
                this.setState({successMsg:'Login Successful..'})
                this.setState({errorMsg:''})
                this.setState({loading:''})
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
                this.setState({email:''})
                this.setState({password:''})
                this.setState({successMsg:''})
                this.setState({loading:''})
                if(errorMessage.includes('user')){
                    this.setState({errorMsg:'Email Not Found'})
                }else if(errorMessage.includes('wrong')){
                    this.setState({errorMsg:'Wrong Password'})
                }
            });
        }
    }

    SignInWithGoogle = ()=>{
        const provider = new GoogleAuthProvider();
  
        signInWithPopup(auth, provider)
        .then((user)=>{
            this.writeUserData(user)
        })
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user; 
        }).catch((error) => { 
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    writeUserData(user) {
        const {name, email} = this.state
        console.log(user.user.uid)
        const db = getDatabase();
        set(ref(db, 'users/' + user.user.uid), {
          username: user.user.displayName,
          email: user.user.email,
        });
      }
    
    render() {
        const {email,password,errorMsg,successMsg,loading} = this.state
        return (
        <>
        <Container style={{marginTop:'20px'}}>
        
        <Row >
            <Col sm={4}>
            <img src={Chater}  />
            <h4 className='mt-3'>Hello Everyone , We are Chitchat</h4>
            <p>Welcome to chitchat please login to your account.</p>
            
            {errorMsg?<Alert variant='danger'>{errorMsg}</Alert>:''}
            {successMsg?<Alert variant='success'>{successMsg}</Alert>:''}
            


            <Form style={{width:'300px',fontWeight:'600'}} onSubmit={this.handleSubmit}>
                
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name='email' type="email" placeholder="Enter email" onChange={this.handleChange} value={email}/>
                </Form.Group>
                

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name='password' type="password" placeholder="Password" onChange={this.handleChange} value={password}/>
                </Form.Group>

                {/* BUTTON PART */}
                    <Button variant="primary" style={{width:'100%',padding:'10px',marginTop:'20px'}} onClick={this.handleSubmit} className={loading?'disabled':''}>
                        {loading?<Spinner animation="border" />:'Login'}
                    </Button>{' '}
                    {/* GOOGLE LOGIN */}
                    <Button style={{width:'100%',padding:'10px',marginTop:'20px'}} onClick={this.SignInWithGoogle}>Sign in With Google</Button>


            </Form>
            <p style={{paddingTop:'20px'}}>Create an account? {' '}
               <Link to="/">Registration</Link>  
            </p>
            </Col>

            <Col sm={8}>
                <img src={Three} alt="" style={{width:'100%',height:'95%'}}/>
            </Col>
        </Row>
        </Container>
        </>
        )
    }
}

