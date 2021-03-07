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
                        {/* <h2 className="text-center" style={{ marginTop: "50px", marginBottom: "50px" }}>{category.name}</h2> */}

                        <br />
                        <div className="itemList" id="portfolio"></div>
                        {posts.map((post, i) => {
                            return (
                                <div key={i}>
                                    {post.category._id === category
                                        ?

                                        <div className="Item portfolio-item img-fluid" style={{ display: 'block', marginRight: "auto", marginLeft: "auto", width: "800px", height: "100%" }} key={i}>

                                            <Link

                                                className="portfolio-link" to={`/post/${post._id}`}
                                            >

                                                <img
                                                    style={{ width: "800px" }}
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
                </section>

            </div >

        )
    };
}


export default PostByCategories;