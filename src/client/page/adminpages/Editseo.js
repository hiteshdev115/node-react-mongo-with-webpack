import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

class Editseo extends Component {
    constructor(props) {
        super(props);
        
        this.onChangepageTitle = this.onChangepageTitle.bind(this);
        this.onChangepageUrl = this.onChangepageUrl.bind(this);
        this.onChangemetaTitle = this.onChangemetaTitle.bind(this);
        this.onChangemetaDescription = this.onChangemetaDescription.bind(this);
        this.onChangemetaImageUrl = this.onChangemetaImageUrl.bind(this);
        //this.toggleChange = this.toggleChange.bind(this);
        this.onChangeFollow = this.onChangeFollow.bind(this);
        
        this.state = {
            id:'',
            pageTitle: '',
            pageUrl: '',
            metaTitle: '',
            metaDescription: '',
            metaImageUrl: '',
            message: '',
            follow:'',
            index:'',
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        }; 
    }

    componentDidMount(){
        const { match: {params} } = this.props;
        var indexVal = '';
        var url = 'http://localhost:3001/api/getSingleseo/';
        axios.get(url+`${params.seoid}`)
        .then(response => {
            console.log(response.data.index);
            
            if(response.data.index === 'INDEX')
            {
              indexVal = 'checked';
            }
            console.log(response.data.follow);
            this.setState({ 
                id:response.data._id,
                pageTitle: response.data.pageTitle,
                pageUrl: response.data.pageUrl,
                metaTitle: response.data.metaTitle,
                metaDescription: response.data.metaDescription,
                metaImageUrl:response.data.metaImageUrl,
                follow:response.data.follow,
                index:indexVal
             });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    onChangepageTitle(e) {
        this.setState({
          pageTitle: e.target.value
        });
    }

    onChangepageUrl(e) {
        this.setState({
          pageUrl: e.target.value
        });
    }

    onChangemetaTitle(e) {
        this.setState({
          metaTitle: e.target.value
        });
    }

    onChangemetaDescription(e) {
        this.setState({
          metaDescription: e.target.value
        });
    }
    
    onChangemetaImageUrl(e) {
        this.setState({
          metaImageUrl: e.target.value
        });
    }

    toggleChange = () => {
      this.setState({
          index: !this.state.index,
      });
    }

    onChangeFollow(e) {
      this.setState({
        follow: e.target.value
      });
    }

    
    
    onSubmit = (e) => {
        const { match: {params} } = this.props;
        
        var loginuseid = this.state.adminLoginUser._id;
        var url = 'http://localhost:3001/api/'+loginuseid+'/updateseo/';

        e.preventDefault();
        
        const { pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl, follow, index } = this.state;
        
        axios.put(url+`${params.seoid}`, { pageTitle, pageUrl, metaTitle, metaDescription, metaImageUrl, follow, index })
          .then((result) => {
                this.setState({ message: '' });
                this.props.history.push('../seo-manage');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { message } = this.state;
        
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-signin" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">Edit Seo Details for {this.state.pageTitle} </h2>
                <label htmlFor="inputEmail">Page Name</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Page name here..." name="pageTitle" value={this.state.pageTitle} onChange={this.onChangepageTitle} required/>
                
                <label htmlFor="inputEmail">Page Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Page url here..." name="pageUrl" value={this.state.pageUrl} onChange={this.onChangepageUrl} required/>
                
                <label htmlFor="inputEmail">Meta Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Meta title here..." name="MetaTitle" value={this.state.metaTitle} onChange={this.onChangemetaTitle} required/>
                
                <label htmlFor="inputEmail">Meta Description</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Meta description here..." name="metsDescription" value={this.state.metaDescription} onChange={this.onChangemetaDescription} required/>
                
                <label htmlFor="inputEmail">Meta Image Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Meta image url here..." name="metaImageUrl" value={this.state.metaImageUrl} onChange={this.onChangemetaImageUrl} required/>
                
                <label>Allow search engines to show this Page in search results?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="index" value={this.state.index} checked={this.state.index} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                <br/>
                <label>Should search engines follow links on this Page?</label>
                <div className="primary-switch">
                  <select name="follow" className="nice-select"  onChange={this.onChangeFollow}>
                    <option value="follow" select={this.state.follow === 'FOLLOW' ? 'true': ''}>Yes</option>
                    <option value="nofollow" select={this.state.follow === 'NOFOLLOW' ? 'true': ''}>No</option>
                  </select>
                </div>

                <br/> <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="../seo-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editseo;