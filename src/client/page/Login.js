import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import Seo from '../page/SeoMeatData';
import {connect} from 'react-redux';
import {login} from '../store/action/login.action';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      usernameError:'',
      passwordError:'',
      authError:'',
      //loginError:''
    };
    
    this.checkLogin();
    //this.onChange = this.onChange.bind(this);
  }

  handleValidation(){    
    //Email
    let formIsValid = true;
    this.setState({usernameError: '', passwordError: ''});
    if(!this.state.username){
       formIsValid = false;
       this.setState({usernameError: "Please enetr your email or username"});
    }

    /*if(typeof this.state.username !== "undefined"){
       let lastAtPos = this.state.username.lastIndexOf('@');
       let lastDotPos = this.state.username.lastIndexOf('.');

       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.username.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.username.length - lastDotPos) > 2)) {
          formIsValid = false;
          this.setState({usernameError: "Email is not valid"});
        }
    }*/
    //password
    if(!this.state.password){
        formIsValid = false;
        this.setState({passwordError: "Please enter your valid password"});
    }
    return formIsValid;
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
    this.handleValidation();
  }

  checkLogin(){
    /*if(!localStorage.getItem('admin-jwtToken') || localStorage.getItem('jwtToken')){
      this.props.history.push('/login');
      console.log('first login');
    } else if(localStorage.getItem('adminuserid')){
      console.log('admin');
      this.props.history.push('/admin/dashboard');  
    } else {
      console.log('last login');
      this.props.history.push('/');  
    }*/
    /*
    this.state = {
      loginUser: JSON.parse(localStorage.getItem('userdetails')),
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
    }*/
    if(localStorage.getItem('jwtToken')){   
      console.log('login jwt');
      this.props.history.push('/');    
    } else if(localStorage.getItem('admin-jwtToken')){
      console.log('else login jwt');
      this.props.history.push('/admin/dashboard'); 
    } else {
      this.props.history.push('/login'); 
    }
    
  }

  

  onSubmit = (e) => {
    e.preventDefault();
    if(this.handleValidation() === false){
        //console.log('====>'+this.handleValidation());
        return this.handleValidation();
    } else {
        const { username, password } = this.state;
        if (username && password) {
            this.props.doLoginAction(username, password);
            //console.log(this.props.isLoginSuccess);
            this.setState({
              email: '',
              password: ''
            });
            
        }
    }
    
  }

  render() {
    const { username, password, message } = this.state;
    
    //console.log('===>'+this.props.isLoginSuccess);
    console.log('===>'+this.props.uid);
    console.log('===>'+this.props.loginError);
    
    return (
      <div>
        <Seo />
        <section className="post-content-area section-gap">
          <div className="container">
            <form className="form-signin" onSubmit={this.onSubmit}>
              {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                  { message }
                </div> : ''
              }
              <h2 className="mb-10">Sign in</h2>
              {this.state.authError ? <div className="alert alert-danger" role="alert">{this.state.authError}</div> : ''}
              <label htmlFor="username" className="sr-only">Email address</label>
              <input type="text" className={this.state.usernameError ? 'common-input mb-20 form-control errorMsg' : 'common-input mb-20 form-control'} placeholder="Your username" name="username" value={username} onChange={this.onChange}/>
              
              <label htmlFor="password" className="sr-only">Password</label>
              <input type="password" id="password" className={this.state.passwordError ? 'common-input mb-20 form-control errorMsg' : 'common-input mb-20 form-control'} placeholder="Password" name="password" value={password} onChange={e => this.setState({password: e.target.value})} />
              
              <button className="btn btn-lg btn-primary btn-block" type="submit">Login</button>
              <p>
                Not a member? <Link to="/register"><span className="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> Register here</Link>
              </p>
            </form>
          </div>
        </section> 
        
      </div>   
    );
  }
}

function mapStateToProp(state){
  
  return({
      isLoginSuccess: state.root.isLoginSuccess,
      loginError: state.root.loginError,
      uid: state.root.uid
    })
}
function mapDispatchToProp(dispatch){
  return({
      doLoginAction: (username, password)=>{dispatch(login(username,password))}
  })
}

export default connect(mapStateToProp,mapDispatchToProp)(Login);