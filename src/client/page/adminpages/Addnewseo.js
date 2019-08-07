import React, { Component } from 'react';
import axios from 'axios';

class Addnewseo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          pageTitle: '',
          pageUrl: '',
          metaTitle: '',
          metaDescription:'',
          metaImageUrl: '',
          message: '',
          file: '',
          follow:'',
          index: true,
          adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };        
    }  
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        //console.log(state[e.target.name]);
        this.setState(state);
    }

    toggleChange = () => {
      this.setState({
          index: !this.state.index,
      });
      //console.log('aa');
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        var loginuserid = this.state.adminLoginUser._id;
        var url = 'http://localhost:3001/api/'+loginuserid+'/addseo';
        
        const { pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl, follow, index } = this.state;

        axios.post(url, { pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl,follow,index })
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('./seo-manage');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl, message, follow, index} = this.state;
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-addseo" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">New Seo Page Details</h2>
                <label htmlFor="inputEmail">Page Name</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Page Name here..." name="pageTitle" value={pageTitle} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Pate Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Page Url here.. Ex. http://www.cleversamurai.com/blog" name="pageUrl" value={pageUrl} onChange={this.onChange} required/>

                <label htmlFor="inputEmail">Meta Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Meta title" name="metaTitle" value={metaTitle} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Meta Description</label>
                <textarea className="common-input mb-20 form-control" placeholder="Meta Description" name="metaDescription" value={metaDescription} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Meta Image Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Image Url Ex.- https://www.cleversamurai.com/images/default.jpg" name="metaImageUrl" value={metaImageUrl} onChange={this.onChange} required/>
                
                <label>Allow search engines to show this Page in search results?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="index" value={index} checked={this.state.index} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                <br/>
                <label>Should search engines follow links on this Page?</label>
                <div className="primary-switch">
                  <select name="follow" className="nice-select" value={follow} onChange={this.onChange}>
                    <option value="follow">Yes</option>
                    <option value="nofollow">No</option>
                  </select>
                </div>
                
                <br/><br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="./seo-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Addnewseo;