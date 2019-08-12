import React, { Component } from "react";
//import ShowMoreText from 'react-show-more-text'; 
import axios from 'axios';
import { MDBIcon } from 'mdbreact';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

import Moment from 'react-moment';
//import 'moment-timezone';
import { DataTable } from 'react-data-components';
//import {DataTable, DataColumn, Pagination} from 'react-bootstrap-datatable'


class Seolist extends Component {
  constructor() {
    super();
    this.state = {
      allSeo: [],
      tableRows: [],
      error:null,
      isLoading: true,
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails')),
    };
    this.deleteSeo = this.deleteSeo.bind(this);

  }

  componentWillMount=async() =>{    
    fetch('http://localhost:3001/api/allseo')
     .then(response => response.json())
     .then(data => {
          this.setState({
            isLoading: false,
            allSeo: data
          })
          //console.log(data);
      })
      .catch(error => this.setState({ error, isLoading: false }));  
  }
    
  deleteSeo = (seoid) => {
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
                var url = 'http://localhost:3001/api/deleteseo/'+seoid+'/user/'+_id;
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
      { title: 'Page Name', prop: 'pageTitle', sortable: true, width:300  },
      { title: 'Page Url', prop: 'pageUrl' },
      { title: 'Meta Title', prop: 'metaTitle', sortable: true, }, 
      { title: 'Created At', prop: 'created_at', sortable: true, }, 
      { title: 'Updated At', prop: 'updated_at', sortable: true, },
      { title: 'Action', prop:'action'}
    ];

    const { allSeo, isLoading } = this.state;
        
    let dataTableValue = [];
    if(isLoading === true){
      dataTableValue.push(<div key="fail">Loading....</div>);
    } else {
      for(let i = 0; i< allSeo.length; i++){
        //console.log(blogs[i].title);
        dataTableValue.push({
          id:i,
          pageTitle:allSeo[i].pageTitle,
          pageUrl:allSeo[i].pageUrl,
          metaTitle:allSeo[i].metaTitle,
          created_at:<Moment format="YYYY-MM-DD HH:mm">{allSeo[i].created_at}</Moment>,
          updated_at:<Moment format="YYYY-MM-DD HH:mm">{allSeo[i].updated_at}</Moment>,
          action:<div className="action-colmn"><a href={"/admin/editseo/"+allSeo[i]._id} className="icon-space"><i class="fas fa-pencil-alt"></i></a>
          <a onClick={() => this.deleteSeo(allSeo[i]._id)} className="icon-space"><i class="fas fa-trash-alt"></i></a></div>
        });
      }
    }
    
    return (
          <div className="container list-space">
            <div className="section-top-border">
                <h3 className="mb-30">Seo Management</h3>
                <DataTable
                  className="pagination"
                  keys="hp123"
                  columns={columns}
                  initialData={dataTableValue}
                  initialPageLength={5}
                  initialSortBy={{ prop: 'title', order: 'descending' }}
                  pageLengthOptions={[ 5, 10, 20, 40, 60, 80, 100 ]}
                />
                <div className="progress-table-wrap">
                    <div className="progress-table">
                        <a href="/admin/addnewseo" className="genric-btn primary circle">ADD NEW</a>
                    </div>
                </div>
            </div>
            
          </div>  
    );
  }
}
export default Seolist;