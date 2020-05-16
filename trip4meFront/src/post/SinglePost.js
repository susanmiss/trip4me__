import React, { Component } from 'react';
import { singlePost, remove } from './apiPost';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index.js';



class SinglePost extends Component {
    state = {
        post: '',
        redirectToHome: false,
        redirectToSignin: false
    };

    componentDidMount = () => {
        const postId = this.props.match.params.postId;
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    post: data
                });
            }
        });
    };


    deletePost = () => {
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        remove(postId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your post?');
        if (answer) {
            this.deletePost();
        }
    };

    renderPost = post => {

        return (
            <div>
            <header className="masthead" style={{backgroundImage:`url(${process.env.REACT_APP_API_URL}/post/photo/${post._id})`, marginTop: "50px"}}>
              <div className="container">
                <div className="intro-text">
                  <div className="intro-lead-in"></div>
                  <div className="intro-heading text-uppercase"></div>
                </div>
              </div>
            </header>

            <div className="container">
                <h2 className="text-center" style={{marginTop: "50px", marginBottom: "50px"}}>{post.title}</h2>

                <p>{post.body}</p>

                <br />

                <div className="row">
                  <img className="img-fluid col-md-6 col-sm-12 mb-4" src={`${
                        process.env.REACT_APP_API_URL
                    }/post/photoint/${post._id}`}
                    />


                    <img className="img-fluid col-md-6 col-sm-12 mb-4" src={`${
                          process.env.REACT_APP_API_URL
                      }/post/photointone/${post._id}`}
                      />
                      <br /> <br />

                </div>

                <div className="d-inline-block mb-5">
                    <Link to={`/`} className="btn btn-raised btn-primary btn-sm mb-5">
                        Back to posts
                    </Link>

                </div>

                    <div className="container" style={{marginTop: "50px", marginBottom: "150px"}}>
                        {isAuthenticated() && (
                            <div class="card mt-5 mb-5">
                                <div className="card-body">
                                    <h5 className="card-title">Admin</h5>
                                    <p className="mb-5 text-danger">Edit/Delete as an Admin</p>
                                    <Link
                                        to={`/post/edit/${post._id}`}
                                        className="btn btn-raised btn-warning btn-sm mr-5"
                                    >
                                        Update Post
                                    </Link>
                                    <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                                        Delete Post
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
                <p>.</p>
            </div>

        );
    };

    render() {
        const { post, redirectToHome, redirectToSignin } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div>

                {!post ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    this.renderPost(post)
                )}

            </div>
        );
    }
}

export default SinglePost;
