import React, { Component } from "react";
import Posts from "../post/Posts";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";

class Admin extends Component {
      state = {
        redirectToHome: false
    }

    componentDidMount() {
        if (isAuthenticated().user.role !== "admin") {
            this.setState({ redirectToHome: true });
        }
    }

    render() {
      if (this.state.redirectToHome) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div className="jumbotron">
                    <h2 className="mt-1">Admin Dashboard</h2>

                  </div>
                  <div style={{marginLeft: "5%"}}>
                    <h2>Posts</h2>
                    <Posts />
                </div>
              </div>
        );
    }
}

export default Admin;
