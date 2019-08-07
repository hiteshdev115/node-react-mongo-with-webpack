import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Seo from '../page/SeoMeatData';



class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: '',
      usernameError:'',
      passwordError:'',
      authError:''
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
    this.state = {
      loginUser: JSON.parse(localStorage.getItem('userdetails')),
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
    }
    if(this.state.loginUser === null){
      //open login screen
      //console.log('nullll');
    } else {
      //console.log(this.state.loginUser.admin);
      this.props.history.push('/login');    
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.handleValidation() === false){
        //console.log('====>'+this.handleValidation());
        return this.handleValidation();
    } else {
      var url = 'http://localhost:3001/api/login';
      const { username, password } = this.state;
      axios.post(url, { username, password })
        .then((result) => {  
          this.setState({ message: '' }); 
          if(result.success === false) {
              this.setState({ authError : '' });
              this.setState({ authError : result.msg });
          } else {
              this.setState({ authError : '' });
              var resultObject = JSON.parse(result.data.userData);
              if(resultObject.admin === true){
                localStorage.setItem('admin-jwtToken', result.data.token);
                localStorage.setItem('admin-userdetails', result.data.userData);
                this.props.history.push('/admin/dashboard');
              } else {
                localStorage.setItem('jwtToken', result.data.token);
                localStorage.setItem('userdetails', result.data.userData);
                this.props.history.push('/');
              }
              window.location.reload();
          }
          
        })
        .catch((error) => {
          console.log('===Error=='+error);
          if(error.response.status === 401) {
            this.setState({ message: 'Login failed. Username or password not match' });
          }
        });
    }
    
  }

  render() {
    const { username, password, message } = this.state;
    console.log(this.state.usernameError);
    console.log(this.state.passwordError);
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
              <input type="password" id="password" className={this.state.passwordError ? 'common-input mb-20 form-control errorMsg' : 'common-input mb-20 form-control'} placeholder="Password" name="password" value={password} onChange={this.onChange} />
              
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

export default Login;