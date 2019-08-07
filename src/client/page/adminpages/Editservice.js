import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';

class Editservice extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeServicename = this.onChangeServicename.bind(this);
        this.onEditorChange = this.onEditorChange.bind( this ); 
        
        this.onChangePageTitle = this.onChangePageTitle.bind( this );
        this.onChangeMetaTitle = this.onChangeMetaTitle.bind( this );
        this.onChangeMetaDescription = this.onChangeMetaDescription.bind( this );
        this.handleChange = this.handleChange.bind( this );
        //this.onChangeIndex = this.onChangeIndex.bind( this );
        this.radioChange = this.radioChange.bind(this);
        
        this.state = {
            id:'',
            title: '',
            servicesname: '',
            description: '',
            isActive: true,
            message: '',
            file: null,
            serviceimage:'',
            pageTitle: '',
            metaTitle: '',
            metaDescription: '',
            follow: 'follow',
            index:'Yes',
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };  
    }

    toggleChange = () => {
        this.setState({
            isActive: !this.state.isActive,
        });
    }

    radioChange(e) {
        this.setState({
            index: e.currentTarget.value
        });
    }
    
    onChangeTitle(e) {
        this.setState({
          title: e.target.value
        });
        
        const modified_slug = e.target.value.replace(/\s+/g, '-').toLowerCase();
        //this.setState['servicesname'] = modified_slug;
        this.setState({
            servicesname: modified_slug
          });
    }
    
    onChangeServicename(e) {
        this.setState({
          servicesname: e.target.value
        });
    }

    onEditorChange(e) {
        this.setState({
          description: e.editor.getData()
        });
    }
    
    onChangeHandler=event=>{
        this.setState({
            file: event.target.files[0]
        })
    }

    onChangePageTitle(e) {
        this.setState({
            pageTitle: e.target.value
        });
    }

    onChangeMetaTitle(e) {
        this.setState({
            metaTitle: e.target.value
        });
    }

    onChangeMetaDescription(e) {
        this.setState({
            metaDescription: e.target.value
        });
    }

    handleChange(e) {
        this.setState({
          follow: e.target.value
        });
    }

    componentDidMount(){
        const { match: {params} } = this.props;
        var active = '';
        var indexVal = 'No';
        var url = 'http://localhost:3001/api/getSingleService/';
        axios.get(url+`${params.serviceid}`)
        .then(response => {
            if(response.data.isActive === true){
                active = true;
            }
            if(response.data.index === 'INDEX')
            {
              indexVal = 'Yes';
            }
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                servicesname: response.data.servicesname,
                description: response.data.description,
                serviceimage:response.data.serviceimage,
                isActive:active,
                pageTitle: response.data.pageTitle,
                metaTitle: response.data.metaTitle,
                metaDescription: response.data.metaDescription,
                follow:response.data.follow,
                index:indexVal 
            });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    unlinkThumb = () => {
        console.log('===Remove Thumb Action==>'+this.state.id);
        var active = '';
        var indexVal = 'No';
        var url = 'http://localhost:3001/api/service/removethumb/';
        axios.post(url, {id:this.state.id})
        .then(response => {
            if(response.data.isActive === true){
                active = true;
            }
            if(response.data.index === 'INDEX')
            {
              indexVal = 'Yes';
            }
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                servicesname: response.data.servicesname,
                description: response.data.description,
                serviceimage:'',
                pageTitle: response.data.pageTitle,
                metaTitle: response.data.metaTitle,
                metaDescription: response.data.metaDescription,
                follow:response.data.follow,
                index:indexVal,
                isActive:active
             });
        })
        .catch(error => this.setState({ error }));
    }
    
    onSubmit = (e) => {
        const { match: {params} } = this.props;
        console.log(`${params.serviceid}`);
        e.preventDefault();

        var loginuseid = this.state.adminLoginUser._id;
        var url = '';

        const formData = new FormData();
        
        if(!this.state.file){
            //console.log(this.state.blogimage);
            formData.append('serviceimage',this.state.serviceimage);
            url = 'http://localhost:3001/api/'+loginuseid+'/editservice/';
        } else {
            //console.log('file');
            formData.append('serviceimage',this.state.file);
            url = 'http://localhost:3001/api/'+loginuseid+'/updateservice/';
        }        
        formData.append('servicesname',this.state.servicesname);
        formData.append('title',this.state.title);
        formData.append('description',this.state.description);
        formData.append('isActive',this.state.isActive);
        formData.append('pageTitle',this.state.pageTitle);
        formData.append('metaTitle',this.state.metaTitle);
        formData.append('metaDescription',this.state.metaDescription);
        formData.append('follow',this.state.follow);
        formData.append('index',this.state.index);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        axios.put(url+`${params.serviceid}`, formData, config)
          .then((result) => {
                this.setState({ message: '' });
                this.props.history.push('../../service-manage');
            })
          .catch((error) => {
            //console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { serviceimage, isActive, message} = this.state;
        
        let imageDisp = [];
        if(serviceimage === ''){
            imageDisp.push(
                <input key="12" type="file" name="file" value={serviceimage} onChange={this.onChangeHandler}/>
            )
        } else {
            imageDisp.push(
                <div key="imagecontain">
                    <img src={"/public/images/"+serviceimage} width="200" alt={serviceimage} title={serviceimage}></img>
                    <input type="hidden" name="file" value={serviceimage} />
                    <br/>
                    <a className="genric-btn default-border circle btn-color" onClick={this.unlinkThumb}>Remove Blog Featured Image</a>
                </div>
            )
        }
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-signin" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">Edit Service</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. bolg-slug" name="servicesname" value={this.state.servicesname} onChange={this.onChangeServicename} required/>
                
                <label htmlFor="inputEmail">Description</label>
                
                <CKEditor
                    data={this.state.description}
                    onChange={this.onEditorChange}
                    type="classic"
                    required                    
                />
                <br/>
                <label htmlFor="inputEmail">Publish or not?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="isActive" value={isActive} checked={isActive} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                <br/>
                {imageDisp}

                <div className="comments-area remove-padding">
                    <h3><strong>Seo Management</strong></h3>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="inputEmail">Page Title</label>
                            <input type="text" className="common-input mb-20 form-control" placeholder="Page title here..." name="pageTitle" value={this.state.pageTitle} onChange={this.onChangePageTitle} required />
                            
                            <label htmlFor="inputEmail">Meta Title</label>
                            <input type="text" className="common-input mb-20 form-control" placeholder="Meta title here..." name="MetaTitle" value={this.state.metaTitle} onChange={this.onChangeMetaTitle} required/>
                            
                            <label htmlFor="inputEmail">Meta Description</label>
                            <textarea className="common-input mb-20 form-control" placeholder="Meta description here..." name="metsDescription" rows="5" value={this.state.metaDescription} onChange={this.onChangeMetaDescription} required />
                        </div>
                        <div className="col-sm-6">
                            <label>Allow search engines to show this Page in search results?</label>
                            <div className="radio" >
                                <input type="radio" className="seo-radio" value="Yes" checked={this.state.index === "Yes"}  onChange={this.radioChange} />Yes
                                <input type="radio" className="seo-radio" value="No" checked={this.state.index === "No"} onChange={this.radioChange}/>No
                            </div>
                            
                            <br/>
                            <label>Should search engines follow links on this Page?</label>
                            <div className="primary-switch">
                            <select name="follow" value={this.state.follow.toLowerCase()} className="nice-select"  onChange={this.handleChange}>
                                <option value="follow">Yes</option>
                                <option value="nofollow">No</option>
                            </select>
                            
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                <br/> <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="../../service-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editservice;