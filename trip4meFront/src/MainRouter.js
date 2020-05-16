import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from './auth/PrivateRoute'
import nodemailer from 'nodemailer';
import axios from 'axios'

import Menu from './core/Menu'
import Home from './core/Home'
import Footer from "./core/Footer"
import Contact from "./core/Contact"
import NewPost from "./post/NewPost"
import SinglePost from "./post/SinglePost"
import Signin from "./auth/Signin";
import Admin from './admin/Admin'
import EditPost from './post/EditPost'

const MainRouter = () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <PrivateRoute exact path="/post/new" component={NewPost} />
      <Route exact path="/post/:postId" component={SinglePost} />
      <PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/admin" component={Admin} />
    </Switch>
    <Contact />
    <Footer />
  </div>
);

export default MainRouter;
