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

    loadMore = number => {
        this.setState({ page: this.state.page + number });
        this.loadPosts(this.state.page + number);
    };

    loadLess = number => {
        this.setState({ page: this.state.page - number });
        this.loadPosts(this.state.page - number);
    };

    renderPosts = posts => {
        return (
          <>
                  {posts.map((post, i) => {
                      return (

                          <section className="page-section mb-2" id="portfolio">
                          <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 portfolio-item">
                                <Link className="portfolio-link"  to={`/post/${post._id}`}>
                                  <div className="portfolio-hover">
                                    <div className="portfolio-hover-content">
                                    <i className="fas fa-plus fa-3x"/>
                                    </div>
                                  </div>
                                  <img className="img-fluid" src={`${
                                        process.env.REACT_APP_API_URL
                                    }/post/photo/${post._id}`}
                                    />
                                </Link>

                              <div className="portfolio-caption bg-light">
                                <h4>{post.title}</h4>
                                < br />
                                <p className="text-muted">{post.body.substring(0, 60)}</p>
                              </div>
                            </div>
                            </div>
                          </div>

                          </section>

                      );
                  })}


            </>
        );
    };

    render() {
        const { posts, page } = this.state;
        return (
          <section className="page-section" id="portfolio" >
            <div className="container">
              <div className="row">

                  <h2 className="mt-2">
                      {!posts.length ? "No posts yet!" : ""}
                  </h2>

                  {this.renderPosts(posts)}

                <div className="container">
                {page > 1 ? (


                    <button
                        className="btn btn-raised btn-primary mb-1 mt-5"
                        onClick={() => this.loadLess(1)}
                        style={{height: "50px"}}
                    >
                         Previous
                    </button>
                ) : (
                    ""
                )}


                {posts.length ? (

                    <button
                        className="btn btn-raised btn-primary mb-5"
                        onClick={() => this.loadMore(1)}
                        style={{height: "50px"}}
                    >
                        Next
                    </button>
                ) : (
                    ""
                )}

                </div>
              </div>
          </div>
        </section>
        );
    }
}

export default Posts;
