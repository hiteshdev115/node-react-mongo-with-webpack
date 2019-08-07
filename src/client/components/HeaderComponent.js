import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

class Header extends Component {
  
  logoutAdmin() {
    localStorage.removeItem('admin-jwtToken');
    localStorage.removeItem('admin-userdetails');
    window.location.href="/login";
  }
  logoutUser() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userdetails');
    window.location.href="/login";
  }

  componentDidMount()
  {
    this.fetchAllServicesForMenu();
  }

  fetchAllServicesForMenu = () => {
		const url = 'http://localhost:3001/api/allservices';
		axios.get(url)
			.then(response => {
					this.setState({
					  isLoading: false,
					  servicesMenu: response.data
					})
					//console.log(response.data);		
			})
			.catch(error => this.setState({ error, isLoading: false }));  
	}

  render() {
    this.state = {
      loginUser: JSON.parse(localStorage.getItem('userdetails')),
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
    }
    
    var username = '';
    var isAdmin = '';
    var isAdminUser = false;
    var adminusername = '';
    
    if(this.state.loginUser === null){
      username = '';
    } else {
      username = this.state.loginUser.name;
      isAdmin = this.state.loginUser.admin;
    }
    
    if(this.state.adminLoginUser === null){ 
      adminusername = '';
    } else {
      adminusername = this.state.adminLoginUser.name;
      isAdminUser = this.state.adminLoginUser.admin;
    }
    
    if(isAdmin === true){
      if(window.location.href.indexOf("admin") > -1){
        //console.log('admin');
        
        return (
          <header id="header">
          <div className="container main-menu">
            <div className="row align-items-center justify-content-between d-flex">
              <div id="logo">
                <a href="/admin/dashboard"><img className="logo" src={require('../../../public/images/cs-logo.png')} alt="clever samurai" title="clever samurai" /></a>
              </div>
              <nav id="nav-menu-container">
                <ul className="nav-menu">
                  <li><Link to="/admin/dashboard"> Home </Link></li>
                  <li>Management
                    <ul>
                      <li><Link to="/admin/blog-manage"> Blog Management </Link></li>
                      <li><Link to="/admin/service-manage"> Services Management </Link></li>
                      <li><Link to="/admin/project-manage"> Project Management </Link></li>
                      <li><Link to="/admin/seo-manage"> SEO Management </Link></li>
                    </ul>
                  </li>
                  
                  <li><Link to="/admin/contactus-list"> Inquiry List </Link></li>
                  <li><Link to="/admin/settings"> Settings </Link></li>
                  <li><Link to="/" target="_blank"> Go Website </Link></li>
                  
                  {adminusername ? <li className="loginuser">Hello..{adminusername}
                        <ul className="loginuser-submenu">
                          <li onClick={this.logoutAdmin}>Logout</li>
                        </ul>
                      </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                  }             
                </ul>
              </nav>		
            </div>
          </div>
          </header>      
        );
      }
      else{
        let loginUserData = [];
        
        if(isAdmin === false){
          if(username !== ''){
            
            loginUserData.push(
              <li className="loginuser">Hello..{username}
                <ul className="loginuser-submenu">
                  <li onClick={this.logoutUser}>Logout</li>
                </ul>
              </li>
             );
          } else {
            loginUserData.push(<li key="login"><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>);
          }
        } else {
          //console.log(username);
          loginUserData.push(<li key="login"><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>);
        }
        return (
          <header id="header">
            <div className="container main-menu">
              <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                  <a href="/"><img className="logo" src={require('../../../public/images/cs-logo.png')} alt="clever samurai" title="clever samurai" /></a>
                </div>
                <nav id="nav-menu-container">
                  <ul className="nav-menu">
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/blog"> Blog </Link></li>
                    <li><Link to="/services"> Services </Link></li>
                    <li><Link to="/portfolio"> Portfolio </Link></li>
                    <li><Link to="/contactus"> Contact us </Link></li>
                    {loginUserData}
                  </ul>
                </nav>		
              </div>
            </div>
          </header>
        );     
      }
      
    } else {
     // console.log('main else hp'+isAdminUser);
      
      if(isAdminUser === true){
        //console.log('It is Admin user');
        if(window.location.href.indexOf("admin") > -1){
          return (
            <header id="header">
            <div className="container main-menu">
              <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                  <a href="/admin/dashboard"><img className="logo" src={require('../../../public/images/cs-logo.png')} alt="clever samurai" title="clever samurai" /></a>
                </div>
                <nav id="nav-menu-container">
                  <ul className="nav-menu">
                    <li><Link to="/admin/dashboard"> Home </Link></li>
                    <li>Management
                      <ul>
                        <li><Link to="/admin/blog-manage"> Blog Management </Link></li>
                        <li><Link to="/admin/service-manage"> Services Management </Link></li>
                        <li><Link to="/admin/project-manage"> Project Management </Link></li>
                        <li><Link to="/admin/seo-manage"> SEO Management </Link></li>
                      </ul>
                    </li>
                    <li><Link to="/admin/contactus-list"> Inquiry List </Link></li>
                    <li><Link to="/admin/settings"> Settings </Link></li>
                    <li><Link to="/" target="_blank"> Go Website </Link></li>
                    
                    {adminusername ? <li className="loginuser">Hello..{adminusername}
                          <ul className="loginuser-submenu">
                            <li onClick={this.logoutAdmin}>Logout</li>
                          </ul>
                        </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                    }             
                  </ul>
                </nav>		
              </div>
            </div>
            </header>      
          );
        } else {
          return (
            <header id="header">
            <div className="container main-menu">
              <div className="row align-items-center justify-content-between d-flex">
                <div id="logo">
                  <a href="/"><img className="logo" src={require('../../../public/images/cs-logo.png')} alt="clever samurai" title="clever samurai" /></a>
                </div>
                <nav id="nav-menu-container">
                  <ul className="nav-menu">
                    <li><Link to="/"> Home </Link></li>
                    <li><Link to="/blog"> Blog </Link></li>
                    <li><Link to="/services"> Services </Link></li>
                    <li><Link to="/portfolio"> Portfolio </Link></li>
                    <li><Link to="/contactus"> Contact us </Link></li>
                    {username ? <li className="loginuser">Hello..{username}
                          <ul className="loginuser-submenu">
                            <li onClick={this.logoutUser}>Logout</li>
                          </ul>
                        </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                    }             
                  </ul>
                </nav>		
              </div>
            </div>
            </header>      
          );
        }        
      } else {
        //console.log('No Admin user');
      }
      return (
        <header id="header">
        <div className="container main-menu">
          <div className="row align-items-center justify-content-between d-flex">
            <div id="logo">
              <a href="/"><img className="logo" src={require('../../../public/images/cs-logo.png')} alt="clever samurai" title="clever samurai" /></a>
            </div>
            <nav id="nav-menu-container">
              <ul className="nav-menu">
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/blog"> Blog </Link></li>
                <li><Link to="/services"> Services </Link></li>
                <li><Link to="/portfolio"> Portfolio </Link></li>
                <li><Link to="/contactus"> Contact us </Link></li>
                {username ? <li className="loginuser">Hello..{username}
                      <ul className="loginuser-submenu">
                        <li onClick={this.logoutUser}>Logout</li>
                      </ul>
                    </li> : <li><Link to="/login"> Login </Link> | <Link to="/register"> Sign up </Link> </li>
                }             
              </ul>
            </nav>		
          </div>
        </div>
        </header>      
      );
    }
    
  }
}

export default Header;