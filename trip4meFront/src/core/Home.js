import React from "react";
import Posts from '../post/Posts'
import Contact from './Contact'


const Home = () => (
  <div>
    <header className="masthead">
      <div className="container">
        <div className="intro-text">
          <div className="intro-lead-in"></div>
          <div className="intro-heading text-uppercase"></div>
        </div>
      </div>
    </header>

    <div className="page-section bg-welcome">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Welcome to Trip4me</h2>
            <h3 className="section-subheading text-welcome">'It's a dangerous business, Frodo, going out your door. You step onto the road, and if you don't keep your feet, there's no knowing where you might be swept off to...' Bilbo Baggings</h3>
          </div>
        </div>
      </div>
    </div>

      <div>
        <Posts />
      </div>  

  </div>
);


export default Home;
