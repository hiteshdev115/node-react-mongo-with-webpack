import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';

class Editblog extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            id:'',
            title: '',
            blogname: '',
            subtitle: '',
            description: '',
            isActive: true,
            message: '',
            file: null,
            blogimage:'',
            categoryid:'',
            pageTitle: '',
            metaTitle: '',
            metaDescription: '',
            follow: 'follow',
            index:'Yes',
            categoryAll:[],
            selectedcategory: [],
            //chk: true,
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };   
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBlogname = this.onChangeBlogname.bind(this);
        this.onChangeSubtitle = this.onChangeSubtitle.bind(this);
        this.onEditorChange = this.onEditorChange.bind( this );
        
        this.onChangePageTitle = this.onChangePageTitle.bind( this );
        this.onChangeMetaTitle = this.onChangeMetaTitle.bind( this );
        this.onChangeMetaDescription = this.onChangeMetaDescription.bind( this );
        this.handleChange = this.handleChange.bind( this );
        //this.onChangeIndex = this.onChangeIndex.bind( this );
        this.radioChange = this.radioChange.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind( this );  
        
        console.log('constructor');
        this.getAllCategory();
        
    }

    getAllCategory=async() =>{ 
        fetch('http://localhost:3001/api/allcategory')
         .then(response => response.json())
         .then(data => {
              this.setState({
                isLoading: false,
                categoryAll: data                
              });  
              //console.log(data);       
          })
          .catch(error => this.setState({ error, isLoading: false }));  
          //console.log(data);         
    }

    toggleChange = () => {        
        this.setState({
            isActive: !this.state.isActive,
        });
    }

    handleCheckboxChange(e, i) {
        let isChecked = e.target.checked;
        if (isChecked == true){            
            this.state.selectedcategory = this.state.selectedcategory.concat([e.target.value]);            
        } else {            
            this.state.selectedcategory = this.state.selectedcategory.filter(function(val) {return val!==e.target.value})
        }
        console.log(this.state.selectedcategory);
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
                blogname: modified_slug
            });
        }
    }
    onChangeBlogname(e) {
        this.setState({
          blogname: e.target.value
        });
    }
    onChangeSubtitle(e) {
        this.setState({
            subtitle: e.target.value
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
        //console.log(`${params.blogid}`);
        var active = '';
        var indexVal = 'No';
        var url = 'http://localhost:3001/api/getSingleblog/';
        axios.get(url+`${params.blogid}`)
        .then(response => {
            //console.log(response.data);
            if(response.data.isActive === true){
                active = true;
            }
            if(response.data.index === 'INDEX')
            {
              indexVal = 'Yes';
            }
            //console.log('---From did mount-->'+indexVal);
            this.setState({ 
                id:response.data._id,
                title: response.data.title,
                blogname: response.data.blogname,
                subtitle: response.data.subtitle,
                description: response.data.description,
                blogimage:response.data.blogimage,
                isActive:active,
                categoryid:response.data.blogcats,
                pageTitle: response.data.pageTitle,
                metaTitle: response.data.metaTitle,
                metaDescription: response.data.metaDescription,
                follow:response.data.follow,
                index:indexVal
                //file:response.data.blogimage
             });
        })
        .catch(error => this.setState({ error, isLoading: false }));
        //this.getAllCategory();
    }

    

    unlinkThumb = () => {
        console.log('===Remove Thumb Action==>'+this.state.id);
        var active = '';
        var indexVal = 'No';
        var url = 'http://localhost:3001/api/removethumb/';
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
                blogname: response.data.blogname,
                subtitle: response.data.subtitle,
                description: response.data.description,
                blogimage:'',
                categoryid:response.data.blogcats,
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
        console.log(`${params.blogid}`);

        var loginuseid = this.state.adminLoginUser._id;
        var url = '';

        e.preventDefault();
        const formData = new FormData();
        //console.log('===>'+this.state.file+this.state.blogimage);

        if(this.state.file === null){
            formData.append('blogimage',this.state.blogimage);
            url = 'http://localhost:3001/api/'+loginuseid+'/editblog/';
        } else {
            formData.append('blogimage',this.state.file);
            url = 'http://localhost:3001/api/'+loginuseid+'/updateblog/';
        } 
          
        formData.append('blogname',this.state.blogname);
        formData.append('title',this.state.title);
        formData.append('subtitle',this.state.subtitle);
        formData.append('description',this.state.description);
        formData.append('isActive',this.state.isActive);
        formData.append('category',this.state.selectedcategory);
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
        
        axios.put(url+`${params.blogid}`, formData, config)
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('/admin/blog-manage');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { blogimage, categoryid, categoryAll, isActive, message} = this.state;
        
        
        let checkboxes = [];
        for(var i = 0; i< categoryAll.length; i++){
            var chk = false;
            if(categoryid && categoryid.indexOf(categoryAll[i]._id) > -1 ){
                chk = true;
                this.state.selectedcategory = this.state.selectedcategory.concat(categoryAll[i]._id); 
            }
            checkboxes.push(
                <div key={categoryAll[i]._id} className="category_cls">
                    <input type="checkbox" name="selectedcategory" id="selectedcategory" defaultChecked={chk} value={categoryAll[i]._id} onClick={e => this.handleCheckboxChange(e, i)} ></input>   
                    <label htmlFor={categoryAll[i]._id}>{categoryAll[i].categoryname}</label>             
                </div>
            );
        }

        let imageDisp = [];
        if(blogimage === ''){
            imageDisp.push(
                <input key="12" type="file" name="file" value={blogimage} onChange={this.onChangeHandler}/>
            )
        } else {
            imageDisp.push(
                <div key="imagecontain">
                    <img src={"/public/images/"+blogimage} width="230" alt={blogimage} title={blogimage}></img>
                    <input type="hidden" name="file" value={blogimage} />
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
                <h2 className="mb-10">Edit Blog</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={this.state.title} onChange={this.onChangeTitle} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. bolg-slug" name="blogname" value={this.state.blogname} onChange={this.onChangeBlogname} required/>

                <label htmlFor="inputEmail">Sub Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Sub title" name="subtitle" value={this.state.subtitle} onChange={this.onChangeSubtitle} required/>
                
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

                <div className="container comments-area remove-padding cat">
                    <div className="row">
                        <div className="col-4">
                            <h3><strong>Assign Category</strong></h3>  
                        </div>
                        <div className="col-8">
                            {checkboxes}
                        </div>                    
                    </div>
                </div>
               
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
                <a href="/admin/blog-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editblog;