import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';

class Editproject extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:'',
            title: '',
            slug: '',
            category: '',
            description: '',
            isActive: true,
            message: '',
            file: null,
            projectimage:'',
            pageTitle: '',
            metaTitle: '',
            metaDescription: '',
            follow: 'follow',
            index:'Yes',
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };   
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeslug = this.onChangeslug.bind(this);
        this.onChangecategory = this.onChangecategory.bind(this);
        this.onEditorChange = this.onEditorChange.bind( this );
        
        this.onChangePageTitle = this.onChangePageTitle.bind( this );
        this.onChangeMetaTitle = this.onChangeMetaTitle.bind( this );
        this.onChangeMetaDescription = this.onChangeMetaDescription.bind( this );
        this.handleChange = this.handleChange.bind( this );
        //this.onChangeIndex = this.onChangeIndex.bind( this );
        this.radioChange = this.radioChange.bind(this);
    }

    toggleChange = () => {        
        this.setState({
            isActive: this.state.isActive,
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
        if(e.target.name === 'title'){
            const modified_slug = e.target.value.replace(/\s+/g, '-').toLowerCase();
            this.setState({
                slug: modified_slug
            });
        }
    }
    onChangeslug(e) {
        this.setState({
          slug: e.target.value
        });
    }
    onChangecategory(e) {
        this.setState({
            category: e.target.value
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
        //console.log(this.props);
        //console.log(`${params.projectid}`);
        var active = '';
        var indexVal = 'No';
        var url = 'http://localhost:3001/api/getSingleproject/';
        axios.get(url+`${params.projectid}`)
        .then(response => {
            //console.log(response.data);
            if(response.data.isActive === true){
                active = true;
            }
            if(response.data.index === 'INDEX')
            {
              indexVal = 'Yes';
            }
            console.log('---From did mount-->'+indexVal);
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                slug: response.data.slug,
                category: response.data.category,
                description: response.data.description,
                projectimage:response.data.projectimage,
                isActive:active,
                pageTitle: response.data.pageTitle,
                metaTitle: response.data.metaTitle,
                metaDescription: response.data.metaDescription,
                follow:response.data.follow,
                index:indexVal
                //file:response.data.projectimage
             });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    unlinkThumb = () => {
        console.log('===Remove Thumb Action==>'+this.state.id);
        var active = '';
        var indexVal = 'No';
        var url = 'http://localhost:3001/api/project/removethumb/';
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
                slug: response.data.slug,
                category: response.data.category,
                description: response.data.description,
                projectimage:'',
                pageTitle: response.data.pageTitle,
                metaTitle: response.data.metaTitle,
                metaDescription: response.data.metaDescription,
                follow:response.data.follow,
                index:indexVal,
                isActive:active});
        })
        .catch(error => this.setState({ error }));
    }  
    
    onSubmit = (e) => {
        const { match: {params} } = this.props;
        console.log(`${params.projectid}`);

        var loginuseid = this.state.adminLoginUser._id;
        var url = '';

        e.preventDefault();
        const formData = new FormData();
        //console.log('===>'+this.state.file+this.state.projectimage);

        if(this.state.file === null){
            formData.append('projectimage',this.state.projectimage);
            url = 'http://localhost:3001/api/'+loginuseid+'/editproject/';
        } else {
            formData.append('projectimage',this.state.file);
            url = 'http://localhost:3001/api/'+loginuseid+'/updateproject/';
        } 
                  
        formData.append('title',this.state.title);
        formData.append('category',this.state.category);
        formData.append('slug',this.state.slug);
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
        
        axios.put(url+`${params.projectid}`, formData, config)
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('../../project-manage');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { projectimage, isActive, message} = this.state;
        //console.log('---Index----'+index);
        //console.log('---Follow----'+this.state.follow);
        
        let imageDisp = [];
        if(projectimage === ''){
            imageDisp.push(
                <input key="12" type="file" name="file" value={projectimage} onChange={this.onChangeHandler}/>
            )
        } else {
            imageDisp.push(
                <div key="imagecontain">
                    <img src={"/public/images/"+projectimage} width="230" alt={projectimage} title={projectimage}></img>
                    <input type="hidden" name="file" value={projectimage} />
                    <br/>
                    <a className="genric-btn default-border circle btn-color" onClick={this.unlinkThumb}>Remove project Featured Image</a>
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
                <h2 className="mb-10">Edit project</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. project-slug" name="slug" value={this.state.slug} onChange={this.onChangeslug} required/>

                <label htmlFor="inputEmail">category</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="category" name="category" value={this.state.category} onChange={this.onChangecategory} required/>
                
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
                <a href="../../project-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editproject;