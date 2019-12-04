import React, { Component } from 'react';
import {
    Router,
    Route,
    Switch
  } from 'react-router-dom';

import '../../public/css/linearicons.css';
//import '../../public/css/owl.carousel.css';
import '../../public/css/font-awesome.min.css';
import '../../public/css/nice-select.css';
import '../../public/css/magnific-popup.css';
import '../../public/css/bootstrap.css';
import '../../public/css/main.css';
import './App.css';
import './style.css';



//FrontEnd Component
import HeaderComponent from './components/HeaderComponent'; //common component
import FooterComponent from './components/FooterComponent'; //common component

import HomeComponent from './page/Home';
import BlogComponent from './page/Blog';
import BlogDetailsComponent from './page/Blogdetails';
import ServicesComponent from './page/Services';
import ServiceDetailsComponent from './page/Servicedetails';
import PortfolioComponent from './page/Portfolio';
import ProjectDetailsComponent from './page/ProjectDetails';
import Login from './page/Login';
import Register from './page/Register';
import ContactusComponent from './page/Contactus';

//Admin Component
import DashboardComponent from './page/dashboard';
import AdminBlogListComponent from './page/adminpages/Bloglist';
import AdminAddnewblogComponent from './page/adminpages/Addnewblog';
import AdminEditlogComponent from './page/adminpages/Editblog';
import AdminServiceListComponent from './page/adminpages/Servicelist';
import AdminAddNewServiceComponent from './page/adminpages/Addnewservice';
import AdminEditServiceComponent from './page/adminpages/Editservice';
import AdminContactListComponent from './page/adminpages/Contactlist';
import AdminSeoListComponent from './page/adminpages/Seolist';
import AdminAddNewSeoComponent from './page/adminpages/Addnewseo';
import AdminEditSeoComponent from './page/adminpages/Editseo';
import AdminProjectListComponent from './page/adminpages/projectlist';
import AdminAddNewProjectComponent from './page/adminpages/Addnewproject';
import AdminEditProjectComponent from './page/adminpages/Editproject';
import AdminSettingComponent from './page/adminpages/Setting';

import AdminCategoryListComponent from './page/adminpages/Categorylist';
import AdminAddNewCategoryComponent from './page/adminpages/Addnewcategory';
import AdminEditCategoryComponent from './page/adminpages/Editcategory';

import SearchBlogComponent from './page/Searchblog';

import AdminDatatableComponent from './page/adminpages/DatatablePage';

import test1 from './page/test1';
import test2 from './page/test2'; //this is test route


//import {createBrowserHistory} from 'history'
//const history = createBrowserHistory()
import history from './History';

class Routers extends Component {
  render() { 
    return (        
      <Router history={history}>
        <div>
          <HeaderComponent></HeaderComponent> 
          <Switch>
          <Route exact path='/test1' component={test1}></Route>
          <Route exact path='/test2' component={test2}></Route>
            <Route exact path='/' component={HomeComponent}></Route>
            <Route exact path='/blog/' component={BlogComponent}></Route>
            <Route exact path='/blog/:blogname/' component={BlogDetailsComponent}></Route>
            <Route exact path='/blog/searchbycategory/:categoryname/' component={SearchBlogComponent}></Route>
            <Route exact path='/services/' component={ServicesComponent}></Route>
            <Route exact path='/service/:servicesname/' component={ServiceDetailsComponent}></Route>
            <Route exact path='/portfolio/' component={PortfolioComponent}></Route>    
            <Route exact path='/portfolio/:slug/' component={ProjectDetailsComponent}></Route>
            <Route path='/login/' component={Login} />
            <Route path='/register/' component={Register} />
            <Route exact path='/contactus/' component={ContactusComponent}></Route>

            <Route exact path='/admin/dashboard/' component={DashboardComponent}></Route>
            <Route exact path='/admin/blog-manage/' component={AdminBlogListComponent}></Route>
            <Route exact path='/admin/addnewblog/' component={AdminAddnewblogComponent}></Route>
            <Route exact path='/admin/edit/:blogid/' component={AdminEditlogComponent}></Route>            
            <Route exact path='/admin/service-manage/' component={AdminServiceListComponent}></Route>
            <Route exact path='/admin/addnewservice/' component={AdminAddNewServiceComponent}></Route>
            <Route exact path='/admin/service/edit/:serviceid/' component={AdminEditServiceComponent}></Route>
            <Route exact path='/admin/contactus-list/' component={AdminContactListComponent}></Route>
            <Route exact path='/admin/seo-manage/' component={AdminSeoListComponent}></Route>
            <Route exact path='/admin/addnewseo/' component={AdminAddNewSeoComponent}></Route>
            <Route exact path='/admin/editseo/:seoid/' component={AdminEditSeoComponent}></Route>
            <Route exact path='/admin/project-manage/' component={AdminProjectListComponent}></Route>
            <Route exact path='/admin/addnewproject/' component={AdminAddNewProjectComponent}></Route>     
            <Route exact path='/admin/project/edit/:projectid/' component={AdminEditProjectComponent}></Route> 
            <Route exact path='/admin/settings/' component={AdminSettingComponent}></Route>
            <Route exact path='/admin/demopage/' component={AdminDatatableComponent}></Route>
            <Route exact path='/admin/category-manage/' component={AdminCategoryListComponent}></Route>
            <Route exact path='/admin/addnewcategory/' component={AdminAddNewCategoryComponent}></Route>
            
            <Route exact path='/admin/editcategory/:categoryid/' component={AdminEditCategoryComponent}></Route>
          </Switch>
          <FooterComponent></FooterComponent>
        </div>
      </Router>
    );
  }
}
export default Routers;
