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
                            <a href={"/service/"+servicesname}><h4>{title}</h4></a>
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
      </div>
    );
  }
} 
export default Services;