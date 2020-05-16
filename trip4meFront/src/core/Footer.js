import React from "react";
import {Link} from 'react-router-dom'


const Footer = () => (
  <div>
  <footer className="footer">
  <div className="container">
    <div className="row align-items-center">
      <div className="col-md-4">
        <span className="copyright">Copyright &copy; Trip4me 2020</span>
      </div>
      <div className="col-md-4">
        <ul className="list-inline social-buttons">
          <li className="list-inline-item">
            <a href="https://www.instagram.com/susan_missaglia" target="_blank">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.github.com/susanmiss" target="_blank">
              <i className="fab fa-github"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.linkedin.com/in/susan-missaglia/" target="_blank">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
      </div>
      <div className="col-md-4">
        <ul className="list-inline quicklinks">
          <li className="list-inline-item">
            <Link to="#">By Susan Missaglia</Link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</footer>

  </div>
);

export default Footer;
