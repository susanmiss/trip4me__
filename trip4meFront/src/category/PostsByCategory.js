import React, { Component } from "react";
import { list } from "../post/apiPost";
import { list as listCategory } from "../category/apiCategories";
import { photo } from "../post/apiPost";
import { singleCategory, remove } from './apiCategories';
import { Link, Redirect } from 'react-router-dom';
import { isAuthenticated } from '../auth/index.js';
import Posts from '../post/Posts';


class PostByCategories extends Component {
    constructor(props) {
        super()
        this.state = {
            category: props.match.params.categoryId,
            posts: [],


        };
    }

    loadPosts = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({
                    posts: data
                });
            }
        });
    };

    componentDidMount() {
        this.loadPosts();
    }


    render() {
        const { posts, category } = this.state;
        return (

            <div>
                <header className="masthead" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/category/photo/${category})`, marginTop: "50px" }}>
                    <div className="container">
                        <div className="intro-text">
                            <div className="intro-lead-in"></div>
                            <div className="intro-heading text-uppercase"></div>
                        </div>
                    </div>
                </header>

                <section >
                    <div>
                        <br />
                        <div className="itemList" id="portfolio">
                            {posts.map((post, i) => {
                                return (
                                    <div key={i} className="Item portfolio-item">
                                        {post.category._id === category
                                            ?
                                            <div className="Item portfolio-item" key={i} style={{ marginBottom: 100, marginTop: -50 }}>

                                                <Link
                                                    className="portfolio-link" to={`/post/${post._id}`}
                                                >
                                                    <div className="portfolio-hover">
                                                        <div className="portfolio-hover-content">
                                                            <i className="fas fa-plus fa-3x" />
                                                        </div>
                                                    </div>
                                                    <img
                                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                        className="img-fluid" src={`${process.env.REACT_APP_API_URL
                                                            }/post/photo/${post._id}`}
                                                    />
                                                </Link>

                                                <div className="portfolio-caption bg-light" >
                                                    <h4 className="text-center">{post.title}</h4>
                                                    < br />
                                                    <p className="text-muted text-center pb-3">
                                                    </p>
                                                </div>

                                            </div>
                                            :
                                            ''}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>

            </div >

        )
    };
}


export default PostByCategories;