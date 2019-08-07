import React, { Component } from "react";
import ShowMoreText from 'react-show-more-text'; 
import parse from 'html-react-parser';
import Seo from '../page/SeoMeatData';

class Services extends Component {
  
  constructor() {
    super()
    this.state = {
      services: [],
      error:null,
      isLoading: true
    } 
  }

  componentDidMount() {
    this.fetchAllServices();
  }

  fetchAllServices() {
    fetch('http://localhost:3001/api/allservices')
     .then(response => response.json())
     .then(data =>
        this.setState({
          isLoading: false,
          services: data
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
    
  render() {
    const { services, error, isLoading } = this.state;
    //console.log(services);
    return (
      <div>
        <Seo /> 
        <section className="about-banner">
          <div className="container">				
            <div className="row d-flex align-items-center justify-content-center">
              <div className="about-content col-lg-12">
                <h1 className="text-white">
                  Services				
                </h1>	
                <p className="text-white link-nav"><a href="/">Home </a>  <span className="lnr lnr-arrow-right"></span><a href="/services"> Services</a></p>
              </div>	
            </div>
          </div>
        </section>
        {error ? <p>{error.message}</p> : null}
        <section className="services-area section-gap">
          <div className="container">
                  <div className="row d-flex justify-content-center">
                      <div className="menu-content  col-lg-7">
                          <div className="title text-center">
                              <h1 className="mb-10">My Offered Services</h1>
                              <p>At about this time of year, some months after New Year’s resolutions have been made and kept, or made and neglected.</p>
                          </div>
                      </div>
                  </div>
            <div className="row">
              {!isLoading ? (
                services.map(service => {
                  const { _id, title, servicesname, serviceimage, description } = service;
                  
                  return (
                        <div className="col-lg-4 col-md-6" key={_id}>
                          <div className="single-services">
                            <img id="serviceImage" src={"/public/images/"+serviceimage} alt={title} title={title}></img>
                            <a href={"service/"+servicesname}><h4>{title}</h4></a>
                            <div className="excert">                            
                            <ShowMoreText
                                      lines={2}
                                      more=''
                                      less=''
                                      anchorClass=''>
                                      {parse(description)}
                            </ShowMoreText>
                            </div>
                          </div>
                        </div>
                  );
                }) 
              ) : (
                    <h3>Services should be appear in short time....</h3>
              )}											
            </div>
          </div>	
        </section>
        <section className="testimonial-area section-gap">
		        <div className="container">
		            <div className="row d-flex justify-content-center">
		                <div className="menu-content pb-70 col-lg-8">
		                    <div className="title text-center">
		                        <h1 className="mb-10">Client’s Feedback About Me</h1>
		                        <p>It is very easy to start smoking but it is an uphill task to quit it. Ask any chain smoker or even a person.</p>
		                    </div>
		                </div>
		            </div>
		            <div className="row">
		                <div className="active-testimonial">
		                    <div className="single-testimonial item d-flex flex-row">
		                        <div className="thumb">
		                            <img className="img-fluid" src="../../../public/img/elements/user1.png" alt=""></img>
		                        </div>
		                        <div className="desc">
		                            <p>
		                                Do you want to be even more successful? Learn to love learning and growth. The more effort you put into improving your skills, the bigger the payoff you.		     
		                            </p>
		                            <h4>Harriet Maxwell</h4>
		                            <p>CEO at Google</p>
		                        </div>
		                    </div>
		                    <div className="single-testimonial item d-flex flex-row">
		                        <div className="thumb">
		                            <img className="img-fluid" src="../../../public/img/elements/user2.png" alt=""></img>
		                        </div>
		                        <div className="desc">
		                            <p>
		                                A purpose is the eternal condition for success. Every former smoker can tell you just how hard it is to stop smoking cigarettes. However.
		                            </p>
		                            <h4>Carolyn Craig</h4>
		                            <p>CEO at Facebook</p>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </section>
      </div>
    );
  }
}
 
export default Services;