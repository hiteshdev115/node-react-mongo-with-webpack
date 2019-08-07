import React, { Component } from "react";
import axios from 'axios';
import Seo from '../page/SeoMeatData';

class Contactus extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      customername:'',
      email:'',
      subject:'',
      message:'',
      successmessage:''
    }
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    
    const { customername, email, subject, message } = this.state;
    
    var url = 'http://localhost:3001/api/contactus';
    axios.post(url, { customername, email, subject, message })
      .then((result) => {
            console.log(result);
            this.setState({ successmessage: 'Thank you for contacting us, We will get back to you shortly.' });
            this.props.history.push('/contactus');
            this.setState(
                {
                    customername:'',
                    email:'',
                    subject:'',
                    message:'',
                }
            );
            
        })
      .catch((error) => {
        if(error.response.status === 500) {
            this.setState({ successmessage: 'Sorry wrong request!' });
        }
        if(error.response.status === 401) {
          this.setState({ successmessage: 'Something went wrong. Please try agian leter.' });
        }
      });
  }
  
  
  render() {
    const { customername, email, subject, message, successmessage } = this.state;
    return (
      <div>
        <Seo/>					
        <section className="relative about-banner">	
				<div className="overlay overlay-bg"><img className="banner" src={"/public/images/contact-us-banner.jpg"} alt=""></img></div>
				<div className="container">				
					<div className="row d-flex align-items-center justify-content-center">
						<div className="about-content col-lg-12">
							<h1 className="text-white">
								Contact Us				
							</h1>
						</div>	
					</div>
				</div>
			</section>
							  
			<section className="contact-page-area section-gap remove-gap">
				<div className="container">
                    <h1 className="headText"><span>Let’s start a conversation. </span>It’s time to achieve more.</h1>
					<div className="row extra-row">
                        
                        <div className="col-lg-4 d-flex flex-column address-wrap">
							<div className="single-contact-address d-flex flex-row">
								<div className="icon">
									<span className="lnr lnr-home"></span>
								</div>
								<div className="contact-details">
									<h5>Mississauga, Ontario, Canada</h5>
									<p>
                                        5100 Orbitor Drive,<br/>
                                        Suite 100,<br/>
                                        L4W 4Z4
									</p>                            
								</div>
							</div>
							<div className="single-contact-address d-flex flex-row">
								<div className="icon">
									<span className="lnr lnr-phone-handset"></span>
								</div>
								<div className="contact-details">
									<h5>1.905.275.2220</h5>
                                    <h5>1.866.875.2220</h5>
									<p>Mon to Fri 8.30am to 5pm</p>
								</div>
							</div>
							<div className="single-contact-address d-flex flex-row">
								<div className="icon">
									<span className="lnr lnr-envelope"></span>
								</div>
								<div className="contact-details">
									<h5>support@cleversamurai.com</h5>
									<p>Send us your query anytime!</p>
								</div>
							</div>														
						</div>
						<div className="col-lg-8">
                        {successmessage ? <div className="alert alert-warning alert-dismissible" role="alert">
                            { successmessage }
                        </div> : ''
                        }
							<form className="form-area contact-form text-right" id="contactUs" onSubmit={this.onSubmit}>
								<div className="row">	
									<div className="col-lg-6 form-group">
										<input name="customername" placeholder="Enter your name" onChange={this.onChange} className="common-input mb-20 form-control" required type="text" value={customername} />
										<input name="email" placeholder="Enter email address" onChange={this.onChange} pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$" className="common-input mb-20 form-control" value={email} required type="email"/>
										<input name="subject" placeholder="Enter subject" onChange={this.onChange} className="common-input mb-20 form-control" required value={subject} type="text"/>
        							</div>
									<div className="col-lg-6 form-group">
										<textarea className="common-textarea form-control" name="message" onChange={this.onChange} placeholder="Enter Messege" required value={message} />				
									</div>
									<div className="col-lg-12">
										<div className="alert-msg"></div>
										<button className="genric-btn primary" type="submit">Send Message</button>											
									</div>
								</div>
							</form>	
						</div>
                    </div>
                    <div className="row">
                        <div className="mapouter">
                            <div className="gmap_canvas">
                                <iframe width="1140" height="500" id="gmap_canvas" src="https://maps.google.com/maps?q=clever%20samurai&t=&z=17&ie=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                            </div>
                        </div>
                    </div>
				</div>	
			</section>
      </div>
    );
  }
}
 
export default Contactus;