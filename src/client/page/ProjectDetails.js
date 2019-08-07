import React, { Component } from "react";
import axios from 'axios';
import parse from 'html-react-parser';
//import dateFormat from 'dateformat';
import MetaTags from 'react-meta-tags';

class ProjectDetails extends Component {
    

  constructor(props) {
    super(props)
    this.state = {
        id: '',
        title: '',
        slug: '',
        category: '',
        description: '',
        projectimage: '',
        isActive: '',
        pageTitle: '',
        metaTitle: '',
        metaDescription: '',
        follow: '',
        index: '',
        created_at:'',
        error: null,
        isLoading: true
    }
    
  }

  componentDidMount() {
    const { match: {params} } = this.props;
    const url = 'http://localhost:3001/api/getSingleProjectByName/';
    axios.get(url+`${params.slug}`)
        .then(response => {
            this.setState({ 
                isLoading: false,
                id:response.data._id,
                title: response.data.title,
                slug: response.data.slug,
                category: response.data.category,
                description: response.data.description,
                projectimage:response.data.projectimage,
                created_at: response.data.created_at,
                isActive: response.data.isActive,
                pageTitle:response.data.pageTitle,
                metaTitle:response.data.metaTitle,
                metaDescription:response.data.metaDescription,
                follow:response.data.follow,
                index:response.data.index
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
       
  }
  
  render() {
    
    const { error, id, title, category, description, projectimage, pageTitle, metaTitle, metaDescription, follow, index } = this.state;
    
    return (
      <div>
        <MetaTags>
            <title>{pageTitle}</title>
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="cleversamurai" />
            <meta name="description"  content={metaDescription}/>
            <meta property="og:title" content={metaTitle} />
            <meta property="og:image" content={"/pubnlic/images/"+projectimage} />
            <meta property="og:url" content={window.location.href} />
            <meta name="ROBOTS" content={index+', '+follow} />
        </MetaTags>
        <section className="relative about-banner"> 
            &bnsp;
        </section>
        {error ? <p>{error.message}</p> : null}
        <section className="relative about-banner" id={id}>	
            <div className="overlay overlay-bg"></div>
            <div className="container">				
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="about-content col-lg-12">
                        <div className="feature-img">
                            <img className="img-fluid" src={"/public/images/"+projectimage} alt={category}></img>
                        </div>
                    </div>	
                </div>
            </div>
        </section>
        <div className="whole-wrap">
            <div className="container">
                <div className="section-top-border">
                    <h3 className="mb-30">{title}</h3>
                    <div className="row">
                        <div className="col-lg-12">
                            <blockquote className="generic-blockquote">
                                {parse(description)}
                            </blockquote>
                            <div className="screenshot">
                                <img src={"/public/images/"+projectimage} alt={category}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
      </div>
    );
  }
}
 
export default ProjectDetails;