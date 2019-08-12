import React, { Component } from "react";
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Moment from 'react-moment';
import { DataTable } from 'react-data-components';

class Categorylist extends Component {
  constructor() {
    super();
    this.state = {
      category: [],
      tableRows: [],
      error:null,
      isLoading: true,
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails')),
    };
    this.deleteCategory = this.deleteCategory.bind(this);

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
    
  deleteCategory= (categoryid) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="alert alert-primary" role="alert">
            <h4>Are you sure you want to delete this item permanantly?</h4>
            <br/>
            <p>
            <button className="genric-btn primary circle arrow" onClick={onClose}>No</button>&nbsp;&nbsp;&nbsp;
            <button className="genric-btn success circle arrow" onClick={() => {
                const { _id } = this.state.adminLoginUser;    
                var url = 'http://localhost:3001/api/deletecategory/'+categoryid+'/user/'+_id;
                axios.delete(url)
                .then(response => {
                    if(response){
                      this.componentWillMount();
                    }
                })
                .catch(error => this.setState({ error }));
                onClose()
            }}>Yes, Delete it!</button>
            </p>
          </div>
        )
      }
    })
  }
 
  
  render() {
    
    var columns = [
      { title: 'Category Name', keys:'categoryname', prop: 'categoryname', sortable: true, width:300  },
      { title: 'Status', keys:'isActive', prop: 'isActive', sortable: true  },
      { title: 'Created At', keys:'createDate', prop: 'created_at', sortable: true, }, 
      { title: 'Updated At', keys:'updateDate', prop: 'updated_at', sortable: true, },
      { title: 'Action', keys:'action', prop:'action'}
    ];

    const { category, isLoading } = this.state;
        
    let dataTableValue = [];
    if(isLoading === true){
      dataTableValue.push(<div key="fail">Loading....</div>);
    } else {
      for(let i = 0; i< category.length; i++){       
        dataTableValue.push({
          id:i,
          categoryname:category[i].categoryname,
          isActive: category[i].isActive ? <p className="text-success">Published</p> : <p className="text-secondary">Draft</p>,
          created_at:<Moment format="YYYY-MM-DD HH:mm">{category[i].created_at}</Moment>,
          updated_at:<Moment format="YYYY-MM-DD HH:mm">{category[i].updated_at}</Moment>,
          action:<div className="action-colmn"><a href={"/admin/editcategory/"+category[i]._id} className="icon-space"><i className="fas fa-pencil-alt"></i></a>  
          <a onClick={() => this.deleteCategory(category[i]._id)} className="icon-space"><i className="fas fa-trash-alt"></i></a></div>
        });
      }
    }
    
    return (
          <div className="container list-space">
            <div className="section-top-border">
                <h3 className="mb-30">Category Management</h3>
                <DataTable
                  className="pagination"
                  keys="123456"
                  columns={columns}
                  initialData={dataTableValue}
                  initialPageLength={5}
                  initialSortBy={{ prop: 'created_at', order: 'descending' }}
                  pageLengthOptions={[ 5, 10, 20, 40, 60, 80, 100 ]}
                />
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <a href="/admin/addnewcategory" className="genric-btn primary circle">ADD NEW</a>
                    </div>
                </div>
            </div>
            
          </div>  
    );
  }
}
export default Categorylist;