import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import axios from 'axios';

import CKEditor from 'ckeditor4-react';
//import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


class Setting extends Component {
    constructor(props) {
        super(props);
        
        this.inputUpdate = this.inputUpdate.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);       
        
        this.state = {
            id:'',
            websiteurl: '',
            companyname:'',
            address1: '',
            address2: '',
            city:'',
            proviance:'',
            country:'',
            contactno:'',
            twitterurl:'',
            linkedinurl:'',
            facebookurl:'',
            instagramurl:'',
            footertext:'',
            file: '',
            logoimage:''
        }; 
    }

    inputUpdate = e => {
        this.setState({ 
           [e.target.name]: e.target.value 
        })
    };
    
    onEditorChange(e) {
        this.setState({
          footertext: e.editor.getData()
        });
    }
    
    onChangeHandler=event=>{
        console.log(event.target.files[0]);
        this.setState({
            file: event.target.files[0]
        })
    }

    componentDidMount(){
        var url = 'http://localhost:3001/api/getSetting/';
        axios.get(url)
        .then(response => {
            this.setState({ 
                id:response.data[0]._id,
                websiteurl: response.data[0].websiteurl,
                companyname: response.data[0].companyname,
                address1: response.data[0].address1,
                address2: response.data[0].address2,
                city: response.data[0].city,
                contactno: response.data[0].contactno,
                proviance: response.data[0].proviance,
                country: response.data[0].country,
                twitterurl: response.data[0].twitterurl,
                linkedinurl: response.data[0].linkedinurl,
                facebookurl: response.data[0].facebookurl,
                instagramurl: response.data[0].instagramurl,
                footertext: response.data[0].footertext,
                logoimage:response.data[0].logoimage
                });
        })
        .catch(error => this.setState({ error, isLoading: false }));
    }

    unlinkLogo = () => {
        var url = 'http://localhost:3001/api/removelogo/';
        axios.post(url, {id:this.state.id})
        .then(response => {
           this.componentDidMount();
        })
        .catch(error => this.setState({ error }));
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();        
        if(!this.state.file){
            //console.log(this.state.blogimage);
            formData.append('logoimage',this.state.logoimage);
        } else {
            formData.append('logoimage',this.state.file);
        }
       // console.log('This is settings id====>'+this.state.id);   
        formData.append('id',this.state.id);            
        formData.append('websiteurl',this.state.websiteurl);
        formData.append('companyname',this.state.companyname);
        formData.append('address1',this.state.address1);
        formData.append('address2',this.state.address2);
        formData.append('city',this.state.city);
        formData.append('contactno',this.state.contactno);
        formData.append('proviance',this.state.proviance);
        formData.append('country',this.state.country);
        formData.append('twitterurl',this.state.twitterurl);
        formData.append('linkedinurl',this.state.linkedinurl);
        formData.append('facebookurl',this.state.facebookurl);
        formData.append('instagramurl',this.state.instagramurl);
        formData.append('footertext',this.state.footertext);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        
        var url = 'http://localhost:3001/api/updatesetting/';
        
        axios.post(url, formData, config)
          .then((result) => {
                this.setState({ message: '' });
                this.componentDidMount();
            })
          .catch((error) => {
            if(error.response.status === 401) {
              this.setState({ message: 'Something went wrong. Please try agian leter.' });
            }
          });
      }
   
 
    render() {
        const { logoimage,  message} = this.state;
        let imageDisp = [];
        if(logoimage === ''){
            imageDisp.push(
                <input key="12" type="file" name="file" value={logoimage} onChange={this.onChangeHandler}/>
            )
        } else {
            imageDisp.push(
                <div key="imagecontain">
                    <img src={"/public/images/"+logoimage} width="200" alt={logoimage} title={logoimage}></img>
                    <input type="hidden" name="file" value={logoimage} />
                    <br/>
                    <a className="genric-btn default-border circle btn-color" onClick={this.unlinkLogo}>Remove Logo</a>
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
                <h2 className="mb-10">Website Settings</h2>
                <label htmlFor="inputEmail">Website Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="website Name Ex. https://www.abc.com/" name="websiteurl" value={this.state.websiteurl} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Company Name</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Company Name" name="companyname" value={this.state.companyname} onChange={this.inputUpdate} required/>

                <label htmlFor="inputEmail">Address Line 1</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Address with street# or Unit#" name="address1" value={this.state.address1} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Address Line 2</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Nearest area" name="address2" value={this.state.address2} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">City</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="city" name="city" value={this.state.city} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Proviance</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Proviance" name="proviance" value={this.state.proviance} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Country</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Country" name="country" value={this.state.country} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Contact No</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Contact No Ex. +1(647) 394-5595" name="contactno" value={this.state.contactno} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Twitter Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Twitter Url" name="twitterurl" value={this.state.twitterurl} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">LinkedIn Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="LinkedIn Url" name="linkedinurl" value={this.state.linkedinurl} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Facebook Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Facebook Url" name="facebookurl" value={this.state.facebookurl} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Instagram Url</label>
                <input type="text" className="common-input mb-20 form-control" placeholder="Instagram Url" name="instagramurl" value={this.state.instagramurl} onChange={this.inputUpdate} required/>
                
                <label htmlFor="inputEmail">Footer Text</label>
                
                <CKEditor
                    data={this.state.footertext}
                    onChange={this.onEditorChange}
                    type="classic"
                    required                    
                />
                                
                <br/>
                {imageDisp}
                <br/> <br/>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Save</button>
            </form>
            </div>
        </section>      
        );
    }
}

export default Setting;