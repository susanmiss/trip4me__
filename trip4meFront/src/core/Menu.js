import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated, signin } from '../auth/index.js'



const isActive = (history, path) => {
  if(history.location.pathname === path) return {color: "purple"}
    else return { color: "#ffffff"}
}

const Menu = ({history}) => (

        <nav className="navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" id="mainNav">

        <div className="container">
          <h4>
            <Link className="navbar-brand js-scroll-trigger" to="/">
                  Trip4me
              </Link>
          </h4>

          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
            </button>

              <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav text-uppercase ml-auto">
              <li className="nav-item">
                <Link className="nav-link js-scroll-trigger" to="/" style={isActive(history, '/')}>Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="/#contact">Contact</a>
              </li>

              {!isAuthenticated() && (
                <li className="nav-item">
                  <Link className="nav-link js-scroll-trigger" to="/signin">Sign In</Link>
                </li>
              )}

            </ul>


            { isAuthenticated() && (
              <>
                <ul className="navbar-nav text-uppercase ml-auto">
                  <li className="nav-item">
                      <Link className="nav-link js-scroll-trigger" to={`/post/new`}>
                        Create Post
                      </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link js-scroll-trigger" onClick={()=>signout(()=> history.push('/'))}  to="/">Sign Out</Link>
                  </li>
                  <li className="nav-item">
                      <Link
                          to={`/admin`}
                          className="nav-link">
                          Admin
                      </Link>

                  </li>
                </ul>

              </>

        )}
          </div>
        </div>
      </nav>
    )

export default withRouter(Menu);
