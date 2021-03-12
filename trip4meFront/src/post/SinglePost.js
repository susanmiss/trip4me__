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
                <header className="masthead" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/post/photo/${post._id})`, marginTop: "50px" }}>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in"></div>
                            <div className="intro-heading text-uppercase"></div>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <h2 className="text-center" style={{ marginTop: "50px", marginBottom: "50px" }}>{post.title}</h2>

                    <br />

                    <p className="m-5 text-justify">{post.paragraph1}</p>

                    <div className="row">
                        <img style={{ height: "500px", width: "100%", objectFit: "cover" }}
                            className="img-fluid col-md-6 col-sm-12 mb-4" src={`${process.env.REACT_APP_API_URL
                                }/post/photo1/${post._id}`}
                        />
                        <img style={{ height: "500px", width: "100%", objectFit: "cover" }}
                            className="img-fluid col-md-6 col-sm-12 mb-4" src={`${process.env.REACT_APP_API_URL
                                }/post/photo2/${post._id}`}
                        />
                        <br /> <br />
                    </div>
                    <div className="row">
                        <img style={{ height: "600px", width: "100%", objectFit: "cover" }}
                            className="img-fluid col-md-12 col-sm-12 mb-4" src={`${process.env.REACT_APP_API_URL
                                }/post/photo3/${post._id}`}
                        />
                    </div>

                    <p className="m-5 text-justify">{post.paragraph2}</p>

                    <div className="row">
                        <img style={{ height: "500px", width: "100%", objectFit: "cover" }} className="img-fluid col-md-6 col-sm-12 mb-4" src={`${process.env.REACT_APP_API_URL
                            }/post/photo4/${post._id}`}
                        />
                        <img style={{ height: "500px", width: "100%", objectFit: "cover" }} className="img-fluid col-md-6 col-sm-12 mb-4" src={`${process.env.REACT_APP_API_URL
                            }/post/photo5/${post._id}`}
                        />
                        <br /> <br />
                        <p className="m-5 text-justify">{post.paragraph3}</p>
                    </div>
                    <div className="row">
                        <img style={{ height: "600px", width: "100%", objectFit: "cover" }} className="img-fluid col-md-12 col-sm-12 mb-4" src={`${process.env.REACT_APP_API_URL
                            }/post/photo6/${post._id}`}
                        />
                    </div>
                    <hr />
                    {post.video ?
                        <div style={{ textAlign: "center" }}>
                            <h2 className="m-5">Watch our video:</h2>
                            <iframe
                                style={{
                                    height: '600px', width: "100%", objectFit: "cover", border: 0, frameborder: "0", textAlign: "center"
                                }}
                                src={`https://www.youtube.com/embed/${post.video}`
                                } frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                            </iframe>
                        </div>
                        :
                        ""}


                    <br /> <br />
                    <hr />
                    <div className="text-center">
                        <h2>How to get there:</h2>
                        <br />
                        {post.address ?
                            <h4>Adress:<span className="text-muted"> {post.address}</span></h4>
                            : ""}
                        {post.city ?
                            <h4>City:<span className="text-muted"> {post.city}</span></h4>
                            : ""}
                        {post.region ?
                            <h4>Region:<span className="text-muted"> {post.region}</span></h4>
                            : ""}

                        <iframe
                            style={{ width: '100%', height: '600px', border: 0, frameborder: "0", textAlign: "center" }}
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBl37aBwk41Wk2aFrE1TK90S3d53LA5Z2s
                            &q=${post.address ? post.address : post.city}`} >
                        </iframe>
                    </div>


                    <div className="m-5" style={{ textAlign: "center" }}>
                        <Link to={`/`} className="btn btn-raised btn-primary btn-sm mb-5">
                            Back to posts
                    </Link>

                    </div>

                    <div className="container" style={{ marginTop: "50px", marginBottom: "150px" }}>
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
            </div >

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
