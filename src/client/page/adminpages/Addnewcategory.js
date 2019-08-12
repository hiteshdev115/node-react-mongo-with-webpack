import React, { Component } from 'react';
import axios from 'axios';

class Addnewcategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
          categoryname: '',
          isActive: true,
          adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails'))
        }; 
    }  
    toggleChange = () => {
        this.setState({
            isActive: !this.state.isActive,
        });
    }
    
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        var loginuserid = this.state.adminLoginUser._id;
        var url = 'http://localhost:3001/api/'+loginuserid+'/addcategory/';
        
        const {categoryname, isActive} = this.state;

        axios.post(url, {categoryname,isActive})
          .then((result) => {
                this.setState({ message: '' });
                this.props.history.push('/admin/category-manage');
            })
          .catch((error) => {
            //console.log(error.response);
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
        const { categoryname, isActive, message } = this.state;
        return (
        <section className="post-content-area section-gap">
            <div className="container">
            <form className="form-addblog" onSubmit={this.onSubmit}>
            {message ? <div className="alert alert-warning alert-dismissible" role="alert">
                { message }
              </div> : ''
            }
                <h2 className="mb-10">New Category</h2>
                
                <label>Category name</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Enter category name" name="categoryname" value={categoryname} onChange={this.onChange} required/>
                
                <br/>
                <label>Publish or not?</label>
                <div className="primary-switch">
                    <input type="checkbox" id="primary-switch" name="isActive" value={isActive} checked={this.state.isActive} onChange={this.toggleChange} />
                    <label htmlFor="primary-switch"></label>
                </div>
                <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
                <br/>
                <a href="/admin/category-manage" className="btn btn-lg btn-primary btn-block">Back To List</a>
            </form>
            </div>
        </section>      
        );
    }
}
export default Addnewcategory;