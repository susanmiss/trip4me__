import React, { useState, useEffect } from "react";
import { list } from '../core/apiCore';
import Posts from '../post/Posts'
import { Link } from "react-router-dom";


const Search = () => {
    const [data, setData] = useState({
        search: '',
        results: [],
        searched: false
    });

    const { search, results, searched } = data;

    const searchData = () => {
        console.log('Word searched: ', search)
        if (search) {
            list({ search: search || undefined })
                .then(response => {
                    if (response.error) {
                        console.log(response.error);
                    } else {
                        setData({
                            ...data,
                            results: response,
                            searched: true
                        })
                    }
                })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData()
    }

    const handleChange = event => {
        setData({
            ...data,
            search: event.target.value,
            searched: false
        })
        // console.log(data)
    }

    const searchedProducts = (results = []) => {
        return (
            <div className="row">
                {results.map((post, i) => (
                    <div className="m-5" key={i}>
                        <h2 className="pb-5">Your search results:</h2>
                        <div className="Item portfolio-item" style={{ marginBottom: "100px" }} key={i}>
                            <Link className="portfolio-link" to={`/post/${post._id}`}>

                                <img className="img-fluid" src={`${process.env.REACT_APP_API_URL
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
                ))
                }
            </div >
        )
    }


    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text input-search">
                <input
                    type="search"
                    className="form-control input-search-intern"
                    onChange={handleChange} placeholder="Search by city, county, place.... "
                />
                <div className="btn input-group-append">
                    <button className="input-group-text button-search">Search</button>
                </div>
            </span>
        </form>
    )



    return (
        <div className="row">
            {/* {JSON.stringify(results)} */}
            <div className="container">{searchForm()}</div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>


        </div>
    )
}

export default Search;