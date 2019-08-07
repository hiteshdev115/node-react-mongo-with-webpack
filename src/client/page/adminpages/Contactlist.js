import React, { Component } from "react";
import axios from 'axios';
import { MDBIcon } from 'mdbreact';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import { DataTable } from 'react-data-components';

class Contactlist extends Component {
  constructor() {
    super();
    this.state = {
      contact: [],
      error:null,
      isLoading: true,
      adminLoginUser: JSON.parse(localStorage.getItem('admin-userdetails')),
    };
    this.deleteContact = this.deleteContact.bind(this);

  }

  componentWillMount=async() =>{    
    fetch('http://localhost:3001/api/allcontact')
     .then(response => response.json())
     .then(data => {
          this.setState({
            isLoading: false,
            contact: data
          })
          //console.log(data);
      })
      .catch(error => this.setState({ error, isLoading: false }));  
  }
    
  deleteContact= (contactid) => {
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
                var url = 'http://localhost:3001/api/deletecontact/'+contactid;
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
      { title: 'Name', prop: 'customername', sortable: true, width:300  },
      { title: 'Email', prop: 'email' },
      { title: 'Subject', prop: 'subject' }, 
      { title: 'Action', prop:'action',  width:100 }
    ];

    const { contact, isLoading } = this.state;
        
    let dataTableValue = [];
    if(isLoading === true){
      dataTableValue.push(<div key="fail">Loading....</div>);
    } else {
      for(let i = 0; i< contact.length; i++){
        dataTableValue.push({
          id:i,
          customername:contact[i].customername,
          email:contact[i].email,
          subject:contact[i].subject,
          action:<div className="alignment"><a onClick={() => this.deleteContact(contact[i]._id)} className="trash"><MDBIcon far icon="trash-alt" /></a></div>
        });
      }
    }
    
    return (
          <div className="container list-space">
            <div className="section-top-border">
                <h3 className="mb-30">All Customer Inquiry</h3>
                <DataTable
                  className="pagination"
                  keys="hp123"
                  columns={columns}
                  initialData={dataTableValue}
                  initialPageLength={5}
                  initialSortBy={{ prop: 'name', order: 'descending' }}
                  pageLengthOptions={[ 5, 10, 20, 40, 60, 80, 100 ]}
                />
            </div>
            
          </div>  
    );
  }
}
export default Contactlist;