import React, { Component } from "react";
import { list } from "./apiPost";
import { Link } from "react-router-dom";


class Posts extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            page: 1,
        };
    }

    loadPosts = page => {
        list(page).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ posts: data.reverse() });
            }
        });
    };

    componentDidMount() {
        this.loadPosts(this.state.page);
    }

    renderPosts = posts => {
        return (
            <>
                <div className="itemList" id="portfolio">
                    {posts.map((post, i) => {
                        return (
                            <div className="Item portfolio-item img-fluid" style={{ display: 'block', marginRight: "auto", marginLeft: "auto", width: "800px", marginBottom: "100px", border: "solid 1px red" }} key={i}>
                                < Link className="portfolio-link" to={`/post/${post._id}`
                                }>
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content">
                                            <i className="fas fa-plus fa-3x" />
                                        </div>
                                    </div>
                                    <img className="img-fluid" src={`${process.env.REACT_APP_API_URL
                                        }/post/photo/${post._id}`}
                                    />
                                </Link>

                                <div className="portfolio-caption bg-light">
                                    <h4>{post.title}</h4>
                                    < br />
                                    {/* <p className="text-muted">{post.paragraph1.substring(0, 60)}</p> */}
                                </div>

                            </div>


                        );
                    })
                    }

                </div >
            </>
        );
    };

    render() {
        const { posts, page } = this.state;
        return (
            <section>


                {/* <h2 className="mt-2">
                    {!posts.length ? "No posts yet!" : ""}
                </h2> */}
                < div >
                    {this.renderPosts(posts)}
                </div >

            </section >

        );
    }
}

export default Posts;