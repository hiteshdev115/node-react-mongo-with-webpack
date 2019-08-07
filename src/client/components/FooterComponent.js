import React from 'react';
//import { Grid, Nav, NavItem } from 'react-bootstrap';

function Footer(/*props*/) {
  if(window.location.href.indexOf("admin") > -1){
    return (
      <footer className="footer-area admin-footer">
          <div className="container">
              <div className="row">© Clever Samurai 2019. Clever Samurai™, Clever Samurai graphics, logos, designs and case studies are the trademarks and copyright of Clever Samurai, a 5th business® company.
              </div>
          </div>
      </footer>
    );
  } else {
      return (
        <footer className="footer-area section-gap">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>About Me</h4>
                            <p>
                            Clever Samurai™ is a strategy-first, marketing consultancy and creative communications firm. We help organizations achieve more - by realizing what’s possible - so they can grow their profits and their social impact.
                            </p>
                            <p className="footer-text">
                              Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved 
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <h4>Newsletter</h4>
                            <p>Stay updated with our latest trends</p>
                            <div className="" id="mc_embed_signup">
                              <form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01" method="get">
                                <div className="input-group">
                                  <input className="form-control" name="EMAIL" placeholder="Enter Email Address" required="" type="email"></input>
                                  <div className="input-group-btn">
                                    <button className="btn btn-default" type="submit">
                                      <span className="lnr lnr-arrow-right"></span>
                                    </button>    
                                  </div>
                                  <div className="info"></div>  
                                </div>
                              </form> 
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6 col-sm-6 social-widget">
                        <div className="single-footer-widget">
                            <h4>Follow Me</h4>
                            <p>Let us be social</p>
                            <div className="footer-social d-flex align-items-center">
                                <a href="https://twitter.com/cleversamurai/" target="_blank"><img src={"http://localhost:3000/public/images/twitter-icon.png"} alt="Twitter"></img></a>
                                <a href="https://www.linkedin.com/company/clever-samurai" target="_blank"><img src={"http://localhost:3000/public/images/linkedin-icon.png"} alt="LinkedIn"></img></a>
                                <a href="https://www.instagram.com/cleversamurai/" target="_blank"><img src={"http://localhost:3000/public/images/instagram-icon.png"} alt="Instagram"></img></a>
                                <a href="https://www.youtube.com/channel/UCStqDLk5Srt4l42CKrqb_DQ?view_as=subscriber" target="_blank"><img src={"http://localhost:3000/public/images/youtube-icon.png"} alt="YouTube"></img></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
      );
  }  
}
export default Footer;