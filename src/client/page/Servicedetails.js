import React, { Component } from "react";
import axios from 'axios';
import parse from 'html-react-parser';
import dateFormat from 'dateformat';
import MetaTags from 'react-meta-tags';

class Servicedetails extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
        services: [],
        id: '',
        title: '', 
        subtitle:'',
        servicesname: '',
        description: '',
        serviceimage: '',
        authorName:'',
        created_at:'',
        pageTitle:'',
        metaTitle:'',
        metaDescription:'',
        follow:'',
        index:'',
        error: null,
        isLoading: true
    }
    console.log('services details');
    this.getRelatesServices();
  }

  componentDidMount() {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/getSingleServiceByName/';
    axios.get(url+`${params.servicesname}`)
    
        .then(response => {
            this.setState({ 
                isLoading: false,
                id:response.data._id,
                title: response.data.title,
                servicesname: response.data.servicesname,
                description: response.data.description,
                serviceimage:response.data.serviceimage,
                created_at:response.data.created_at,
                authorName:response.data.author[0].name,
                pageTitle:response.data.pageTitle,
                metaTitle:response.data.metaTitle,
                metaDescription:response.data.metaDescription,
                follow:response.data.follow,
                index:response.data.index
             });
        })
        .catch(error => this.setState({ error, isLoading: false }));
  }

  getRelatesServices = () => {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/blog/getRandomService/';
    axios.get(url+`${params.servicesname}`)
        .then(response => {
                this.setState({
                  isLoading: false,
                  services: response.data
                })
                //console.log(this.state.services);
        })
        .catch(error => this.setState({ error, isLoading: false }));  
  }
  
  render() {

    const url = window.location.href;
    
    const facbookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    const twitterUrl = `https://twitter.com/home?status=${url}`;
    const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;

    const { isLoading, services, error, title, description, serviceimage, created_at, authorName, pageTitle, metaTitle, metaDescription, follow, index } = this.state;
   
    return (
      <div>
        <MetaTags>
            <title>{pageTitle}</title>
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="cleversamurai" />
            <meta name="description"  content={metaDescription}/>
            <meta property="og:title" content={metaTitle} />
            <meta property="og:image" content={"/images/"+serviceimage} />
            <meta property="og:url" content={window.location.href} />
            <meta name="ROBOTS" content={index+', '+follow} />
        </MetaTags>
        <section className="relative about-banner">	
            <div className="overlay overlay-bg"><img src={"/public/images/"+serviceimage} alt={title}></img></div>
            <div className="container">				
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="about-content col-lg-12">
                        <h1 className="text-white back">
                            {title}			
                        </h1>
                    </div>	
                </div>
            </div>
        </section>        
        {error ? <p>{error.message}</p> : null}
        <section className="post-content-area single-post-area custom-position">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                        <div className="single-post row">
                            <div className="col-lg-12">
                                <div className="feature-img">
                                    
                                </div>									
                            </div>
                            <div className="col-lg-3  col-md-3 meta-details">
                                <ul className="tags">
                                    <li><a href="#">{title}</a></li>
                                </ul>
                                <div className="user-details row">
                                    <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">{authorName}</a> <span className="lnr lnr-user"></span></p>
                                    <p className="date col-lg-12 col-md-12 col-6"><a href="#">{dateFormat(created_at, "mediumDate")}</a> <span className="lnr lnr-calendar-full"></span></p>
                                    <ul className="social-links col-lg-12 col-md-12 col-6">
                                        <li><a href={facbookUrl} target="_blank"> <i className="fab fa-facebook"></i></a></li>
                                        <li><a href={twitterUrl} target="_blank"> <i className="fab fa-twitter"></i></a></li>
                                        <li><a href={linkedinUrl} target="_blank"> <i className="fab fa-linkedin"></i></a></li>
                                    </ul>																				
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-9">
                                <h3 className="mt-20 mb-20"></h3>
                                {parse(description)}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 sidebar-widgets">
                        <div className="widget-wrap">
                            <div className="single-sidebar-widget popular-post-widget">
                                <h4 className="popular-title">Related Services</h4>
                                <div className="popular-post-list">
                                    {!isLoading ? (
                                        services.map(service => {
                                            const { _id, title, created_at, servicesname, serviceimage } = service;
                                                if(serviceimage){
                                                    var thumb_image = 'thumbnail_'+serviceimage;
                                                } else {
                                                    var thumb_image = "default.png";
                                                }
                                                return (
                                                    <div className="single-post-list d-flex flex-row align-items-center" key={_id}>
                                                        <div>
                                                            <img className="img-responsive" src={"/public/images/"+thumb_image} alt={title}></img>
                                                        </div>
                                                        <div className="details">
                                                            <a href={"/service/"+servicesname}><h6>{title}</h6></a>
                                                            <p>{dateFormat(created_at, "mediumDate")}</p>
                                                        </div>
                                                    </div>
                                                );
                                        }) 
                                    ) : (
                                    <h3>Loading...</h3>
                                    )}
                                </div>
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
 
export default Servicedetails;