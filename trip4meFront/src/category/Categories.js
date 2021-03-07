import React, { Component } from "react";
import { list } from "./apiCategories";
import { Link } from "react-router-dom";


class Categories extends Component {
    constructor() {
        super()
        this.state = {
            categories: [],

        };
    }

    loadCategories = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ categories: data.reverse() });
            }
        });
    };

    componentDidMount() {
        this.loadCategories();
    }


    renderCategories = categories => {
        return (
            <>
                <div className="itemList" id="portfolio" >
                    {categories.map((category, i) => {
                        return (
                            <div className="Item portfolio-item" key={i} style={{ marginBottom: 100, marginTop: -50 }}>
                                <Link className="portfolio-link" to={`/postsbycategory/${category._id}`}>
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content">
                                            <i className="fas fa-plus fa-3x" />
                                        </div>
                                    </div>
                                    <img
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                        className="img-fluid" src={`${process.env.REACT_APP_API_URL
                                            }/category/photo/${category._id}`}
                                    />
                                </Link>

                                <div className="portfolio-caption bg-light pt-5">
                                    <h4>{category.name}</h4>
                                    < br />
                                    {/* <p className="text-muted">{category.name}</p> */}
                                </div>

                            </div>
                        );
                    })
                    }

                </div>
            </>
        );
    };

    render() {
        const { categories, page } = this.state;
        return (
            <section>


                {/* <h2 className="mt-2">
                    {!posts.length ? "No posts yet!" : ""}
                </h2> */}
                < div >
                    {this.renderCategories(categories)}
                </div >

            </section >

        );
    }
}

export default Categories;