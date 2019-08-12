import React, { Component } from "react";
import ShowMoreText from 'react-show-more-text'; 
import parse from 'html-react-parser'; 
import axios from 'axios';
import dateFormat from 'dateformat';
import Seo from '../page/SeoMeatData';
import Modal from 'react-modal';

const customStyles = {
	content : {
	  top                   : '50%',
	  left                  : '50%',
	  right                 : 'auto',
	  bottom                : 'auto',
	  marginRight           : '-50%',
	  transform             : 'translate(-50%, -50%)',
	  background			: 'rgb(240, 241, 246)'
	}
  };

Modal.setAppElement('body')

class Home extends Component {

	constructor() {
		super()
		this.state = {
			services: [],
			blogs:[],
			projects:[],
			error:null,
			isLoading: true,
			modalIsOpen: false,
			modalPreviewImage:'',
		}
		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
		this.fetchAllServices();
		this.getLatestBlog();
		this.getLatestSixProjects();
	}

	fetchAllServices() {
	fetch('http://localhost:3001/api/allservices')
		.then(response => response.json())
		.then(data =>
		this.setState({
			isLoading: false,
			services: data
		})
		)
		.catch(error => this.setState({ error, isLoading: false }));
	}

	getLatestBlog = () => {
		const url = 'http://localhost:3001/api/getLastThreeBlog/';
		axios.get(url)
			.then(response => {
					this.setState({
					  isLoading: false,
					  blogs: response.data
					})
					console.log(response.data);		
			})
			.catch(error => this.setState({ error, isLoading: false }));  
	}

	getLatestSixProjects = () => {
		const url = 'http://localhost:3001/api/getLastSixProject/';
		axios.get(url)
			.then(response => {
					this.setState({
					  isLoading: false,
					  projects: response.data
					})
					console.log(response.data);		
			})
			.catch(error => this.setState({ error, isLoading: false }));  
	}

	openModal(projectimage='') {
		this.setState({
			modalIsOpen: true,
			modalPreviewImage:projectimage
		});
	}
	
	closeModal() {
		this.setState({
			modalIsOpen: false,
			modalPreviewImage:''
		});
	}

	
  render() {
	const { services, blogs, projects, error, isLoading } = this.state;
    return (  
			<div> 
				<Seo />
				<section className="banner-area">
					<div className="container">
						<div className="row fullscreen align-items-center justify-content-between">
							<div className="col-lg-6 col-md-6 banner-left">
								<h6>This is me</h6>
								<h1>Hitesh Patel</h1>
								<p>
									You will begin to realise why this exercise is called the Dickens Pattern with reference to the ghost showing Scrooge some different futures.
								</p>
								<a href="#" className="primary-btn text-uppercase">discover now</a>
							</div>
							<div className="col-lg-6 col-md-6 banner-right d-flex align-self-end">
								<img className="img-fluid" src={require('../../../public/img/hero-img.png')} alt=""></img>
								
							</div>
						</div>
					</div>					
				</section>	
				<section className="home-about-area pt-120">
					<div className="container">
						<div className="row align-items-center justify-content-between">
							<div className="col-lg-6 col-md-6 home-about-left">
								<img className="img-fluid" src={require('../../../public/img/about-img.png')} alt=""></img>
							</div>
							<div className="col-lg-5 col-md-6 home-about-right">
								<h6>About Me</h6>
								<h1 className="text-uppercase">Personal Details</h1>
								<p>
									Here, I focus on a range of items and features that we use in life without giving them a second thought. such as Coca Cola. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
								</p>
								<a href="#" className="primary-btn text-uppercase">View Full Details</a>
							</div>
						</div>
					</div>	
				</section>
				<section className="services-area section-gap">
					<div className="container">
						<div className="row d-flex justify-content-center">
								<div className="menu-content  col-lg-7">
										<div className="title text-center">
												<h1 className="mb-10">My Offered Services</h1>
												<p>At about this time of year, some months after New Year’s resolutions have been made and kept, or made and neglected.</p>
										</div>
								</div>
						</div>						
						<div className="row">
							{error ? <p>{error.message}</p> : null}
							{!isLoading ? (
								services.map(service => {
								const { _id, title, servicesname, serviceimage, description } = service;
								if(serviceimage)
								{
									var service_image = serviceimage;
								} else {
									var service_image = 'default-image.jpg';
								}
								return (
										<div className="col-lg-4 col-md-6" key={_id}>
										<div className="single-services">
											<img id="serviceImage" src={"/public/images/"+service_image} alt={title} title={title}></img>
											<a href={"service/"+servicesname}><h4>{title}</h4></a>
											<div className="excert">                            
											<ShowMoreText
													lines={2}
													more=''
													less=''
													anchorClass=''>
													{parse(description)}
											</ShowMoreText>
											</div>
										</div>
										</div>
								);
								}) 
							) : (
									<h3>Services should be appear in short time....</h3>
							)}					
						</div>
					</div>	
				</section>
				<section className="facts-area section-gap" id="facts-area">
					<div className="container">				
						<div className="row">
							<div className="col-lg-3 col-md-6 single-fact">
								<h1 className="counter">2536</h1>
								<p>Projects Completed</p>
							</div>
							<div className="col-lg-3 col-md-6 single-fact">
								<h1 className="counter">6784</h1>
								<p>Happy Clients</p>
							</div>
							<div className="col-lg-3 col-md-6 single-fact">
								<h1 className="counter">2239</h1>
								<p>Cups of Coffee</p>
							</div>	
							<div className="col-lg-3 col-md-6 single-fact">
								<h1 className="counter">435</h1>
								<p>Real Professionals</p>
							</div>												
						</div>
					</div>	
				</section>
				<section className="portfolio-area section-gap" id="portfolio">
					<div className="container">
						<div className="row d-flex justify-content-center">
							<div className="menu-content pb-70 col-lg-8">
								<div className="title text-center">
									<h1 className="mb-10">Our Latest Featured Projects</h1>
									<p>Who are in extremely love with eco friendly system.</p>
								</div>
							</div>
						</div>	
						
						<Modal
							isOpen={this.state.modalIsOpen}
							onAfterOpen={this.afterOpenModal}
							onRequestClose={this.closeModal}
							style={customStyles}
							contentLabel="Preview Modal">
					
							
							<div className="close-button">
								<button onClick={this.closeModal}>X</button>
							</div>
							<div className="preview-img">
								<img src={"/public/images/"+this.state.modalPreviewImage} alt="preview" />
							</div>
							</Modal>

						<div className="filters-content" id="portfolio-section">
							<div className="row">
								{error ? <p>{error.message}</p> : null}
								{!isLoading ? (
									projects.map(project => {
									const { _id, title, category, projectimage } = project;											
									if(projectimage)
									{
										var projectImage = projectimage;
									} else {
										var projectImage = 'default-image.jpg';
									}
									return (										
										<div className="single-portfolio col-sm-4" key={_id}>
											<div className="relative">
												<div className="thumb">
													<div className="overlay overlay-bg"></div>
													<img className="image img-fluid" src={"/public/images/"+projectImage} alt={title} title={title}></img>
												</div>												
												<div className="middle cursor" onClick={() => this.openModal(projectImage)}>
													<div className="text align-self-center d-flex"><img src="../../../public/img/preview.png" alt=""></img></div>
												</div>												
											</div>
											<div className="p-inner">
												<h4>{title}</h4>
												<div className="cat">{category}</div>
											</div>
										</div>
										
									);
									}) 
								) : (
										<h3>Portfolio should be appear in short time....</h3>
								)}
								<div className="align">
									<a href="/portfolio" className="btn btn-default" type="submit">View All <span className="lnr lnr-arrow-right"></span></a>
								</div>
							</div>
						</div>
					</div>
        		</section>
				
				<section className="recent-blog-area section-gap">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-8 pb-30 header-text">
								<h1>Latest posts from our blog</h1>
								<p>
									You may be a skillful, effective employer but if you don’t trust your personnel and the opposite, then the chances of improving and expanding the business
								</p>
							</div>
						</div>
						<div className="row">	
							{error ? <p>{error.message}</p> : null}
							{!isLoading ? (
								blogs.map(blog => {
								const { _id, title, blogname, blogimage, description, created_at, author } = blog;
								if(blogimage)
								{
									var blogImage = blogimage;
								} else {
									var blogImage = 'default-image.jpg';
								}
								return (
									<div className="single-recent-blog col-lg-4 col-md-4" key={_id}>
										<div className="thumb">
											<img className="f-img img-fluid mx-auto" src={"/public/images/"+blogImage} alt={title} title={title}></img>
										</div>
										<div className="bottom d-flex justify-content-between align-items-center flex-wrap">
											<div>
												<img className="img-fluid" src="/public/images/user1.png" alt=""></img>
												<a href="#"><span>{author[0].name}</span></a>
											</div>
											<div className="meta">
												{dateFormat(created_at, "mediumDate")}
											</div>
										</div>							
										<a href={"blog/"+blogname}>
											<h4>{title}</h4>
										</a>
										<div>
										<ShowMoreText
												lines={2}
												more=''
												less=''
												anchorClass=''>
												{parse(description)}
										</ShowMoreText>
										</div>
									</div>
										);
									}) 
								) : (
										<h3>Blog should be appear in short time....</h3>
								)}
						</div>
					</div>	
				</section>
			</div> 
    )
  }
}
 
export default Home;