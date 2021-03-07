import React, { Component } from 'react';
import { singleCategory, remove } from './apiCategories';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index.js';



class SingleCategory extends Component {
    state = {
        category: '',
        redirectToHome: false,
        redirectToSignin: false
    };

    componentDidMount = () => {
        const categoryId = this.props.match.params.categoryId;
        singleCategory(categoryId).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    category: data
                });
            }
        });
    };


    deleteCategory = () => {
        const categoryId = this.props.match.params.categoryId;
        const token = isAuthenticated().token;
        remove(categoryId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ redirectToHome: true });
            }
        });
    };

    deleteConfirmed = () => {
        let answer = window.confirm('Are you sure you want to delete your category?');
        if (answer) {
            this.deleteCategory();
        }
    };

    renderCategory = category => {

        return (
            <div>
                <header className="masthead" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/category/photo/${category._id})`, marginTop: "50px" }}>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in"></div>
                            <div className="intro-heading text-uppercase"></div>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <h2 className="text-center" style={{ marginTop: "50px", marginBottom: "50px" }}>{category.name}</h2>

                    <br />

                    <div className="d-inline-block mb-5">

                        <Link to={`/`} className="btn btn-raised btn-primary btn-sm mb-5">
                            Back to Home
                    </Link>

                    </div>

                    <div className="container" style={{ marginTop: "50px", marginBottom: "150px" }}>
                        {isAuthenticated() && (
                            <div class="card mt-5 mb-5">
                                <div className="card-body">
                                    <h5 className="card-title">Admin</h5>
                                    <p className="mb-5 text-danger">Edit/Delete as an Admin</p>
                                    <Link
                                        to={`/category/edit/${category._id}`}
                                        className="btn btn-raised btn-warning btn-sm mr-5"
                                    >
                                        Update Category
                                    </Link>
                                    <button onClick={this.deleteConfirmed} className="btn btn-raised btn-danger">
                                        Delete Category
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
        const { category, redirectToHome, redirectToSignin } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        } else if (redirectToSignin) {
            return <Redirect to={`/signin`} />;
        }

        return (
            <div>

                {!category ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        this.renderCategory(category)
                    )}

            </div>
        );
    }
}

export default SingleCategory;
