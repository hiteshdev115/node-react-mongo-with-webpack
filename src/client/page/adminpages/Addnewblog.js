import React, { Component } from 'react';
import axios from 'axios';
import CKEditor from 'ckeditor4-react';


class Addnewblog extends Component {
    constructor(props) {
        super(props);
        this.state = {
          title: '',
          blogname: '',
          subtitle: '',
          description:'',
          isActive: true,
          message: '',
          file: '',
          pageTitle: '',
          metaTitle: '',
          metaDescription: '',
          follow: 'follow',
          index:'Yes',
          category: [],
          selectedcategory: [],
          adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        }; 
        this.onEditorChange = this.onEditorChange.bind( this ); 
        this.radioChange = this.radioChange.bind(this);  
        this.handleChange = this.handleChange.bind( this );     
    }  
    toggleChange = () => {
        this.setState({
            isActive: !this.state.isActive,
        });
    }

    handleChange(e, index) {
        let isChecked = e.target.checked;
        if (isChecked == true){            
            this.state.selectedcategory = this.state.selectedcategory.concat([e.target.value]);            
        } else {            
            this.state.selectedcategory = this.state.selectedcategory.filter(function(val) {return val!==e.target.value})
        }
        //console.log(this.state.selectedcategory);
    }

    radioChange(e) {
        this.setState({
            index: e.currentTarget.value
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        //console.log(e.target.name);
        if(e.target.name === 'title'){
            const modified_slug = e.target.value.replace(/\s+/g, '-').toLowerCase();
            state['blogname'] = modified_slug;
        }
        this.setState(state);
    }
    onEditorChange( evt ) {
        this.setState( {
            description: evt.editor.getData()
        } );
    }
    onChangeHandler=event=>{
        this.setState({
            file: event.target.files[0],
          loaded: 0,
        })
    }

    componentWillMount=async() =>{    
        fetch('http://localhost:3001/api/allcategory')
         .then(response => response.json())
         .then(data => {
              this.setState({
                isLoading: false,
                category: data
              })
              //console.log(data);
          })
          .catch(error => this.setState({ error, isLoading: false }));  
    }

    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        var loginuserid = this.state.adminLoginUser._id;
        var url = '';
        
        if(!this.state.file){
            formData.append('blogimage','');
            url = 'http://localhost:3001/api/'+loginuserid+'/addblogwithoutimage';
        } else {
            formData.append('blogimage',this.state.file); 
            url = 'http://localhost:3001/api/'+loginuserid+'/addblog';
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
        formData.append('index',this.state.index);
        formData.append('follow',this.state.follow);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        //console.log(this.state.file);
       
        
        axios.post(url, formData, config)
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('/admin/blog-manage/');
            })
          .catch((error) => {
            console.log('===Error=='+error);
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
 
    render() {
        const { title, blogname, subtitle, description, isActive, message, pageTitle, metaTitle, metaDescription, follow, index } = this.state;
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-addblog" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">New Blog</h2>
                <label htmlFor="inputEmail">Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Title here..." name="title" value={title} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Slug</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Slug here.. Ex. bolg-slug" name="blogname" value={blogname} onChange={this.onChange} required/>

                <label htmlFor="inputEmail">Sub Title</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Sub title" name="subtitle" value={subtitle} onChange={this.onChange} required/>
                
                <label htmlFor="inputEmail">Description</label>
                
                <CKEditor
                    data={description}
                    onChange={this.onEditorChange}
                    type="classic"
                    required                    
                />
                <br/>
                <label htmlFor="inputEmail">Publish or not?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="isActive" value={isActive} checked={this.state.isActive} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                
                <br/>
                <input type="file" name="file" onChange={this.onChangeHandler}/>
                <br/>

                <div className="container comments-area remove-padding cat">
                    <div className="row">
                        <div className="col-4">
                            <h3><strong>Assign Category</strong></h3>  
                        </div>
                        <div className="col-8">
                            {this.state.category.map((cat, index) => (
                                <div key={cat._id} className="category_cls">
                                    <input type="checkbox" name="selectedcategory" id="selectedcategory" defaultChecked={cat.categoryname == 'Default' ? true : false} value={cat._id} onClick={e => this.handleChange(e, index)}></input>   
                                    <label htmlFor={cat._id}>{cat.categoryname}</label>             
                                </div>
                            ))}
                        </div>                    
                    </div>
                </div>

                <div className="comments-area remove-padding">
                    <h3><strong>Seo Management</strong></h3>
                    <div className="row">
                        <div className="col-sm-6">
                            <label htmlFor="inputEmail">Page Title</label>
                            <input type="text" className="common-input mb-20 form-control" placeholder="Page title here..." name="pageTitle" value={pageTitle} onChange={this.onChange} required />
                            
                            <label htmlFor="inputEmail">Meta Title</label>
                            <input type="text" className="common-input mb-20 form-control" placeholder="Meta title here..." name="metaTitle" value={metaTitle} onChange={this.onChange} required/>
                            
                            <label htmlFor="inputEmail">Meta Description</label>
                            <textarea className="common-input mb-20 form-control" placeholder="Meta description here..." name="metaDescription" rows="5" value={metaDescription} onChange={this.onChange} required />
                        </div>
                        <div className="col-sm-6">
                            <label>Allow search engines to show this Page in search results?</label>
                            <div className="radio" >
                                <input type="radio" className="seo-radio" value="Yes" checked={index === "Yes"}  onChange={this.radioChange} />Yes
                                <input type="radio" className="seo-radio" value="No" checked={index === "No"} onChange={this.radioChange}/>No
                            </div>
                            
                            <br/>
                            <label>Should search engines follow links on this Page?</label>
                            <div className="primary-switch">
                            <select name="follow" value={follow.toLowerCase()} className="nice-select"  onChange={this.onChange}>
                                <option value="follow">Yes</option>
                                <option value="nofollow">No</option>
                            </select>
                            
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
                <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="/admin/blog-manage/" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Addnewblog;