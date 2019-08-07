import React, { Component } from "react";
import axios from 'axios';
import { MDBIcon } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import Moment from 'react-moment';
import { DataTable } from 'react-data-components';

class Servicelist extends Component {
  constructor() {
    super();
    this.state = {
      services: [],
      error:null,
      isLoading: true,
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails')),
    };
    this.deleteService = this.deleteService.bind(this);

  }

  componentWillMount=async() =>{    
    fetch('http://localhost:3001/api/allservices')
     .then(response => response.json())
     .then(data => {
          this.setState({
            isLoading: false,
            services: data
          })
          //console.log(data);
      })
      .catch(error => this.setState({ error, isLoading: false }));  
  }
    
  deleteService= (serviceid) => {
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
                var url = 'http://localhost:3001/api/deleteservice/'+serviceid+'/user/'+_id;
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
      { title: 'Title', prop: 'title', sortable: true, width:300  },
      { title: 'Service Image', prop: 'serviceimage' },
      { title: 'Status', prop: 'status', sortable: true, }, 
      { title: 'Created At', prop: 'created_at', sortable: true, }, 
      { title: 'Updated At', prop: 'updated_at', sortable: true, },
      { title: 'Action', prop:'action'}
    ];

    const { services, isLoading } = this.state;
        
    let dataTableValue = [];
    if(isLoading === true){
      dataTableValue.push(<div key="fail">Loading....</div>);
    } else {
      for(let i = 0; i< services.length; i++){
        //console.log(blogs[i].title);
        dataTableValue.push({
          id:i,
          title:services[i].title,
          serviceimage:services[i].serviceimage ? <img src={"/public/images/thumbnail_"+services[i].serviceimage} alt="flag" width="100"></img> : <img src="/public/images/default-blog.jpg" alt="flag" width="100"></img>,
          status:services[i].isActive ? <p className="text-success">Published</p> : <p className="text-secondary">Draft</p>,
          created_at:<Moment format="YYYY-MM-DD HH:mm">{services[i].created_at}</Moment>,
          updated_at:<Moment format="YYYY-MM-DD HH:mm">{services[i].updated_at}</Moment>,
          action:<div className="action-colmn"><a href={"./service/edit/"+services[i]._id} className="icon-space"><i class="fas fa-pencil-alt"></i></a>
          <a onClick={() => this.deleteService(services[i]._id)} className="icon-space"><i class="fas fa-trash-alt"></i></a></div>
        });
      }
    }
    
    return (
          <div className="container list-space">
            <div className="section-top-border">
                <h3 className="mb-30">Service Management</h3>
                <DataTable
                  className="pagination"
                  keys="hp123"
                  columns={columns}
                  initialData={dataTableValue}
                  initialPageLength={5}
                  initialSortBy={{ prop: 'created_at', order: 'descending' }}
                  pageLengthOptions={[ 5, 10, 20, 40, 60, 80, 100 ]}
                />
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <a href="./addnewservice" className="genric-btn primary circle">ADD NEW</a>
                    </div>
                </div>
            </div>
            
          </div>  
    );
  }
}
export default Servicelist;