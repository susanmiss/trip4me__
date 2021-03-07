import React, { Component } from "react";
import { singlePost, update } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";
import { list } from '../category/apiCategories';


class EditPost extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            title: "",
            paragraph1: '',
            paragraph2: '',
            paragraph3: '',
            address: '',
            city: '',
            region: '',
            video: '',
            photo: "",
            photo1: '',
            photo2: '',
            photo3: '',
            photo4: '',
            photo5: '',
            photo6: '',
            redirectToHome: false,
            error: "",
            fileSize: 0,
            loading: false,
            category: '',
            categories: []
        };
    }



    init = postId => {
        singlePost(postId).then(data => {
            if (data.error) {
                this.setState({ redirectToHome: true });
            } else {
                this.setState({
                    id: data._id,
                    title: data.title,
                    paragraph1: data.paragraph1,
                    paragraph2: data.paragraph2,
                    paragraph3: data.paragraph3,
                    address: data.address,
                    city: data.city,
                    region: data.region,
                    video: data.paragraph1,
                    category: data.category,
                    error: ""
                });
            }
        });
    };

    loadCategories = async () => {
        await list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ categories: data });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        this.init(postId);
        this.loadCategories();
    }

    isValid = () => {
        const { title, body, fileSize } = this.state;
        if (fileSize > 1000000000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        if (title.length < 4 || title.length > 40) {
            this.setState({ error: "Title must be between 4 and 40 characters", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;
        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });
    };


    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {
            const postId = this.props.match.params.postId;
            const token = isAuthenticated().token;

            update(postId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: "",
                        paragraph1: '',
                        paragraph2: '',
                        paragraph3: '',
                        address: '',
                        city: '',
                        region: '',
                        video: '',
                        category: "",
                        redirectToHome: true
                    });
                }
            });
        }
    };

    editPostForm = (title, categories, category, paragraph1,
        paragraph2,
        paragraph3,
        address,
        city,
        region,
        video,) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Post Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph1</label>
                <textarea
                    onChange={this.handleChange("paragraph1")}
                    type="text"
                    className="form-control"
                    value={paragraph1}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph2</label>
                <textarea
                    onChange={this.handleChange("paragraph2")}
                    type="text"
                    className="form-control"
                    value={paragraph2}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph3</label>
                <textarea
                    onChange={this.handleChange("paragraph3")}
                    type="text"
                    className="form-control"
                    value={paragraph3}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Address</label>
                <input
                    onChange={this.handleChange("address")}
                    type="text"
                    className="form-control"
                    value={address}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">City</label>
                <input
                    onChange={this.handleChange("city")}
                    type="text"
                    className="form-control"
                    value={city}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Region</label>
                <input
                    onChange={this.handleChange("region")}
                    type="text"
                    className="form-control"
                    value={region}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Video</label>
                <input
                    onChange={this.handleChange("video")}
                    type="text"
                    className="form-control"
                    value={video}
                />
            </div>



            <div>
                <p>Current Category Id: {category}</p>
            </div>

            <div>

                {categories.map((category, i) => {
                    return (
                        <div key={i}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={this.handleChange("category")}
                                    value={category._id}
                                />{' '}
                                {category.name}{' '}(Id: {category._id})

                            </label>
                            <br />
                        </div>

                    )
                }

                )}
            </div>



            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update Post
            </button>
        </form>
    );

    render() {
        const {
            id,
            title,
            paragraph1,
            paragraph2,
            paragraph3,
            address,
            city,
            region,
            video,
            redirectToHome,
            error,
            loading,
            categories,
            category
        } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        }

        return (
            <div className="container" style={{ marginTop: "100px", marginBottom: "150px" }}>
                <h2 className="mt-5 mb-5">{title}</h2>

                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                        ""
                    )}

                <img
                    style={{ width: "auto", maxHeight: "350px" }}
                    className="img-thumbnail"
                    src={`${process.env.REACT_APP_API_URL
                        }/post/photo/${id}?${new Date().getTime()}`}

                    alt={title}
                />


                {isAuthenticated().user.role === "admin" &&
                    this.editPostForm(title, categories, category, paragraph1,
                        paragraph2,
                        paragraph3,
                        address,
                        city,
                        region,
                        video)}

            </div>
        );
    }
}

export default EditPost;
