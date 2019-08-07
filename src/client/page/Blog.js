import React, { Component } from "react";
import ShowMoreText from 'react-show-more-text'; 
import parse from 'html-react-parser';


//import config from 'react-global-configuration';
//import axios from 'axios';
import LazyLoad from 'react-lazyload';

import Seo from '../page/SeoMeatData';

class Blog extends Component {
  
  constructor() {
    super()
    this.state = {
      blogs: [],
      error:null,
      isLoading: true,
    }
  }
  
  componentDidMount() {
    this.fetchAllBlog(); 
  }

  fetchAllBlog() {
    fetch('http://localhost:3001/api/allblog')
     .then(response => response.json())
     .then(data =>
        this.setState({
          isLoading: false,
          blogs: data
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  
  
    
  
  render() {    
    
    const { blogs, error, isLoading } = this.state;   
    
    return (
      <div>     
          <Seo/>
          <section className="banner-area relative blog-home-banner" id="home">	
            <div className="overlay overlay-bg"></div>
            <div className="container">				
              <div className="row d-flex align-items-center justify-content-center">
                <div className="about-content blog-header-content col-lg-12">
                  <h1 className="text-white">
                    Dude You’re Getting
                    a Telescope				
                  </h1>	
                  <p className="text-white">
                    There is a moment in the life of any aspiring astronomer that it is time to buy that first
                  </p>
                  <a href="/" className="primary-btn">View More</a>
                </div>	
              </div>
            </div>
          </section>
          <section className="top-category-widget-area pt-90 pb-90 ">
            <div className="container">
              <div className="row">		
                <div className="col-lg-4">
                  <div className="single-cat-widget">
                    <div className="content relative">
                      <div className="overlay overlay-bg"></div>
                        <a href="#" target="_blank">
                          <div className="thumb">
                          <img className="content-image img-fluid d-block mx-auto" src="../../../public/img/blog/cat-widget1.jpg" alt=""></img>
                          </div>
                          <div className="content-details">
                            <h4 className="content-title mx-auto text-uppercase">Social life</h4>
                            <span></span>								        
                            <p>Enjoy your social life together</p>
                          </div>
                        </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-cat-widget">
                    <div className="content relative">
                      <div className="overlay overlay-bg"></div>
                        <a href="#" target="_blank">
                          <div className="thumb">
                          <img className="content-image img-fluid d-block mx-auto" src="../../../public/img/blog/cat-widget2.jpg" alt=""></img>
                          </div>
                          <div className="content-details">
                            <h4 className="content-title mx-auto text-uppercase">Politics</h4>
                            <span></span>								        
                            <p>Be a part of politics</p>
                          </div>
                        </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="single-cat-widget">
                    <div className="content relative">
                      <div className="overlay overlay-bg"></div>
                        <a href="#" target="_blank">
                          <div className="thumb">
                          <img className="content-image img-fluid d-block mx-auto" src="../../../public/img/blog/cat-widget3.jpg" alt=""></img>
                          </div>
                          <div className="content-details">
                            <h4 className="content-title mx-auto text-uppercase">Food</h4>
                            <span></span>
                            <p>Let the food be finished</p>
                          </div>
                        </a>
                    </div>
                  </div>
                </div>												
              </div>
            </div>	
          </section>
          {error ? <p>{error.message}</p> : null}
          
          <section className="post-content-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 posts-list">
                    
                      {!isLoading ? (
                        blogs.map(blog => {
                          const { _id, title, blogname, description, blogimage } = blog;
                          return (
                            <LazyLoad key={_id} height={100} offset={[-100, 100]}>
                              <div className="single-post row" key={_id}>
                                <div className="col-lg-3  col-md-3 meta-details">
                                  <div className="user-details row">
                                    <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">Mark wiens</a> <span className="lnr lnr-user"></span></p>
                                    <p className="date col-lg-12 col-md-12 col-6"><a href="#">12 Dec, 2017</a> <span className="lnr lnr-calendar-full"></span></p>
                                    <p className="view col-lg-12 col-md-12 col-6"><a href="#">1.2M Views</a> <span className="lnr lnr-eye"></span></p>
                                    <p className="comments col-lg-12 col-md-12 col-6"><a href="#">06 Comments</a> <span className="lnr lnr-bubble"></span></p>						
                                  </div>
                                </div>
                                <div className="col-lg-9 col-md-9 ">
                                  <div className="feature-img">
                                  <a href={"/blog/"+blogname}>
                                    <img className="img-fluid" src={"/public/images/"+blogimage} alt=""></img>
                                  </a>
                                  </div>
                                  <a className="posts-title" href={"/blog/"+blogname}><h3>{title}</h3></a>
                                  <div className="excert">
                                    <ShowMoreText
                                        lines={3}
                                        more='Show more'
                                        less='Show less'
                                        anchorClass=''>
                                        {parse(description)}
                                    </ShowMoreText>
                                  </div>
                                  
                                  {/*<a href="" className="primary-btn">View More</a>*/}
                                </div>
                              </div>
                            </LazyLoad>
                        );
                      })                   
                    ) : (
                      <h3>Loading...</h3>
                    )}
                  
                </div>
              </div>
            </div>
          </section>
      </div>
    );
  }
}
 
export default Blog;