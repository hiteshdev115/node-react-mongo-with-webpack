import React, { Component } from "react";
import axios from 'axios';
import parse from 'html-react-parser';
import dateFormat from 'dateformat';
import { Facebook, Twitter, LinkedIn } from 'react-sharingbuttons';
import 'react-sharingbuttons/dist/main.css';
import MetaTags from 'react-meta-tags';
import LazyLoad from 'react-lazyload';
//import config from 'react-global-configuration';

class Searchblog extends Component {
    

  constructor(props) {
    super(props)
    this.state = {
        blogs: [],
        searchblogs:[],
        allCategory:[],
        
        id: '',
        title: '',
        subtitle:'',
        blogname: '',
        description: '',
        blogimage: '',
        category:[],
        authorName:'',
        created_at:'',
        pageTitle:'',
        metaTitle:'',
        metaDescription:'',
        follow:'',
        index:'',
        error: null,
        isLoading: true,
        loadBlog:true,
        message:''
    }
    this.getRelatesPost();
    this.getAllCategory();
  }

  getAllCategory=async() =>{    
    fetch('http://localhost:3001/api/allcategory')
     .then(response => response.json())
     .then(data => {
          this.setState({            
            allCategory: data
          })
          //console.log(data);
      })
      .catch(error => this.setState({ error }));  
  }

  componentDidMount() {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/blog/searchbycategory/';
    axios.get(url+`${params.categoryname}`)
        .then(response => {
            this.setState({ 
                isLoading: false,
                searchblogs:response.data
                
            });
            //console.log(response.data);
        })
        .catch(error => {
            //console.log(error.response);
            if(error.response.status == 400){
                this.setState({ message: error.response.data.message, isLoading: true });    
            } else {
                this.setState({ message: "Something went wrong!", isLoading: true });   
            }
            
        });
       
  }
  
  getRelatesPost = () => {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/blog/getRandomBlog/';
    axios.get(url+`${params.blogname}`)
        .then(response => {
                this.setState({
                  loadBlog: false,
                  blogs: response.data
                })
                //console.log(this.state.blogs);
        })
        .catch(error => {
            this.setState({ error, isLoading: true })
        });  
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
    const { isLoading, loadBlog, blogs, error, message, allCategory, searchblogs } = this.state;
    //console.log(message);
    var cateItem = '';
    allCategory.map(item => {
        
        cateItem += "<li><a href='/blog/searchbycategory/"+item.categoryname+"' className='d-flex justify-content-between'><p>"+item.categoryname+"</p></a></li>";
    })
    return (        
      <div> 
        <section className="relative about-banner"> 
            &bnsp;
        </section>
        {error ? <p>{error.message}</p> : null}
        <section className="post-content-area single-post-area">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 posts-list">
                    {isLoading == false ? (
                        searchblogs.map(sblog => {
                            const { _id, title, created_at, blogname, blogcats, viewCount, author, blogimage } = sblog;
                                if(blogimage){
                                    var thumb_image = 'big_'+blogimage;
                                } else {
                                    var thumb_image = 'default.png';
                                }
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
                                                    <img className="img-fluid" src={"/public/images/"+thumb_image} alt={title}></img>
                                                </div>
                                                <a className="posts-title" href={"/blog/"+blogname}><h3>{title}</h3></a>
                                                <a href={"/blog/"+blogname} className="primary-btn new">View More</a>
                                            </div>
                                        </div>
                                    </LazyLoad>
                                );
                        }) 
                    ) : (
                    <h3 className="errorMessage">{message}</h3>
                    )}                        
                    </div>

                    <div className="col-lg-4 sidebar-widgets">
                        <div className="widget-wrap">
                            <div className="single-sidebar-widget popular-post-widget">
                                <h4 className="popular-title">Popular Posts</h4>
                                <div className="popular-post-list">
                                    {loadBlog == false ? (
                                        blogs.map(blog => {
                                            const { _id, title, created_at, blogname, blogimage } = blog;
                                                if(blogimage){
                                                    var thumb_image = 'thumbnail_'+blogimage;
                                                } else {
                                                    var thumb_image = 'default.png';
                                                }
                                                return (
                                                    <div className="single-post-list d-flex flex-row align-items-center" key={_id}>
                                                        <div>
                                                            <img className="img-responsive" src={"/public/images/"+thumb_image} alt={title}></img>
                                                        </div>
                                                        <div className="details">
                                                            <a href={"/blog/"+blogname}><h6>{title}</h6></a>
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
                            <div className="single-sidebar-widget post-category-widget">
                                <h4 className="category-title">Post Catgories</h4>
                                <ul className="cat-list">
                                    {parse(cateItem)}
                                    </ul>
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
 
export default Searchblog;