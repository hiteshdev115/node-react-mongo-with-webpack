import React, { Component } from "react";
import axios from 'axios';
import MetaTags from 'react-meta-tags';

class SeoMeatData extends Component {
  constructor() {
    super()
    this.state = {
      pageTitle:'',
      pageUrl:'',
      metaTitle:'',
      metaDescription:'',
      metaImageUrl:'',
      index:'',
      follow:''
    }
    this.getSeoMetaData();
  }

  getSeoMetaData = () => {
    var cUrl = window.location.href;
    //console.log('=====>'+cUrl);
    const url = 'http://localhost:3001/api/getSingleSeoByName/';
    axios.get(url+encodeURIComponent(cUrl))
      .then(response => { 
          //console.log(response.data);
          if(response.data){
            this.setState({
              pageTitle:response.data.pageTitle,
              pageUrl:response.data.pageUrl,
              metaTitle:response.data.metaTitle,
              metaDescription:response.data.metaDescription,
              metaImageUrl:response.data.metaImageUrl,
              index:response.data.index,
              follow:response.data.follow
            })         
          }        
      });
  }

  render() {
    const { pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl, index, follow } = this.state;
    return(
            <MetaTags>
                <title>{pageTitle}</title>
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="cleversamurai" />
                <meta name="description"  content={metaDescription}/>
                <meta property="og:title" content={metaTitle} />
                <meta property="og:image" content={metaImageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta name="ROBOTS" content={index+', '+follow} />
            </MetaTags>
    );
  }
}
 
export default SeoMeatData;