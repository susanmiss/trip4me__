import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import { signin, authenticate } from './index';


class Signin extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password:"",
      error:"",
      redirectToReferer: false
    }
  }

  handleChange = name => event => {
    this.setState({error: ""})
    this.setState({[name]: event.target.value});
  }

  clickSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    }
    signin(user)
    .then(data => {
      if(data.error) {
        this.setState({error: data.error})
      }
        else {
          authenticate(data, () => {
            this.setState({redirectToReferer: true})
          })
        }
    })
   };


   signinForm = ( email, password ) => (
     <form>
       <div className="form-group">
         <label className="text-muted">Email</label>
         <input onChange={this.handleChange("email")} value={email} type="email" className="form-control" />
       </div>
       <div className="form-group">
         <label className="text-muted">Password</label>
         <input onChange={this.handleChange("password")} value={password} type="password" className="form-control" />
       </div>
       <button onClick={this.clickSubmit} className="btn btn-raised btn-primary mb-5">Submit</button>
     </form>
   )

  render(){
    const { email, password, error, redirectToReferer} = this.state;

    if(redirectToReferer){
      return <Redirect to="/" />
    }

    return (
      <div className="container" style={{margin: "120px"}}>
        <h2 className="mb-5 mt-5">Signin</h2>

          <div className="alert alert-danger" style={{display: error ? "": "none"}}>
            {error}
          </div>

          {this.signinForm(email, password)}

      </div>
    )
  }
}


export default Signin;
