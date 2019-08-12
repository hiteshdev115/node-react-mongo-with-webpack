import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

class Editproject extends Component {
    constructor(props) {
        super(props);        
        this.state = {
            id:'',
            categoryname:'',
            isActive: true,
            adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        };   
        this.onChangeCategoryname = this.onChangeCategoryname.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange = () => {        
        this.setState({
            isActive: !this.state.isActive,
        });
    }   
    
    onChangeCategoryname(e) {
        this.setState({
            categoryname: e.target.value
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
        var url = 'http://localhost:3001/api/getSinglecategory/';
        axios.get(url+`${params.categoryid}`)
        .then(response => {
            if(response.data.isActive === true){
                active = true;
            }
            this.setState({ 
                id:response.data._id,
                categoryname: response.data.categoryname,
                isActive:active
             });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { match: {params} } = this.props;
        var loginuseid = this.state.adminLoginUser._id;
        var url = '';        
        url = 'http://localhost:3001/api/'+loginuseid+'/updatecategory/';
        
        const {categoryname, isActive} = this.state;
        axios.put(url+`${params.categoryid}`, {categoryname, isActive})
          .then((result) => {
                //console.log(result);
                this.setState({ message: '' });
                //var resultObject = JSON.parse(result.data.userData);
                this.props.history.push('/admin/category-manage');
            })
          .catch((error) => {
            if(error.response.status == 401) {
                this.setState({ message: 'Unauthorized please try again leter!' });
            } else if(error.response.status == 400) {
                this.setState({ message: error.response.data.message });
            } else {
                this.setState({ message: error.response.data.message });
            }
          });
      }
 
    render() {
        const { categoryname, isActive, message} = this.state;
                
        
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
                <input type="text" className="common-input mb-20 form-control" placeholder="Enter category name" name="categoryname" value={this.state.categoryname} onChange={this.onChangeCategoryname} required/>
                                
                <br/>
                <label htmlFor="inputEmail">Publish or not?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="isActive" value={isActive} checked={isActive} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                
                <br/> 

                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="/admin//project-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Editproject;