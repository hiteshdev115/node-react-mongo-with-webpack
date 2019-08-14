import React, { Component } from "react";
import ShowMoreText from 'react-show-more-text'; 
import parse from 'html-react-parser';
import dateFormat from 'dateformat';

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
   
  fnum(x) {
    if(isNaN(x)) return x;
  
    if(x < 9999) {
      return x;
    }
  
    if(x < 1000000) {
      return Math.round(x/1000) + "K";
    }
    if( x < 10000000) {
      return (x/1000000).toFixed(2) + "M";
    }
  
    if(x < 1000000000) {
      return Math.round((x/1000000)) + "M";
    }
  
    if(x < 1000000000000) {
      return Math.round((x/1000000000)) + "B";
    }
  
    return "1T+";
  }
  
  render() {    
    
    const { blogs, error, isLoading } = this.state;   
    //console.log(blogs);
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
                          const { _id, title, blogname, blogcats, author, description, viewCount, blogimage,created_at } = blog;
                          var catName = '';
                          blogcats.map(cat => {
                              //console.log(cat.categoryname);
                              catName += "<li class='categoryforeground'>"+cat.categoryname+"</li>";
                          });
                          return (
                            <LazyLoad key={_id} height={100} offset={[-100, 100]}>
                              <div className="single-post row" key={_id}>
                                <div className="col-lg-3  col-md-3 meta-details">
                                  <ul className="tags">
                                      {parse(catName)}                                    
                                  </ul>
                                  <div className="user-details row">
                                    <p className="user-name col-lg-12 col-md-12 col-6"><a href="#">{author[0].name}</a> <span className="lnr lnr-user"></span></p>
                                    <p className="date col-lg-12 col-md-12 col-6"><a href="#">{dateFormat(created_at, "mediumDate")}</a> <span className="lnr lnr-calendar-full"></span></p>
                                    <p className="view col-lg-12 col-md-12 col-6"><a href="#">{this.fnum(viewCount)} Views</a> <span className="lnr lnr-eye"></span></p>                                    
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
                                        more=''
                                        less= ''
                                        anchorClass=''>
                                        {parse(description)}
                                    </ShowMoreText>
                                  </div>
                                  <a href={"/blog/"+blogname} className="primary-btn new">View More</a>
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