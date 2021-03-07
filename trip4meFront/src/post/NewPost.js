import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";
import { list } from '../category/apiCategories';


class NewPost extends Component {
    constructor(props) {
        super();
        this.state = {
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
            categories: [],
            error: "",
            fileSize: 0,
            loading: false,
            category: [],
            redirectToHome: false,
            address: '',
        };
    }

    loadPosts = async () => {
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
        this.setState({ user: isAuthenticated().user });
        this.loadPosts();
    }

    isValid = () => {
        const { title, body, fileSize, category, paragraph1, address } = this.state;
        if (fileSize > 100000000000) {
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
        console.log()

        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

    };


    handleChangePhoto1 = name => event => {
        this.setState({ error: "" });
        const value = name === "photo1" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo1" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

        console.log(value)

    };

    handleChangePhoto2 = name => event => {
        this.setState({ error: "" });
        const value = name === "photo2" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo2" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

        console.log(value)

    };

    handleChangePhoto3 = name => event => {
        this.setState({ error: "" });
        const value = name === "photo3" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo3" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

        console.log(value)

    };

    handleChangePhoto4 = name => event => {
        this.setState({ error: "" });
        const value = name === "photo4" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo4" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

        console.log(value)

    };

    handleChangePhoto5 = name => event => {
        this.setState({ error: "" });
        const value = name === "photo5" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo5" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

        console.log(value)

    };

    handleChangePhoto6 = name => event => {
        this.setState({ error: "" });
        const value = name === "photo6" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo6" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

        console.log(value)

    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });

        if (this.isValid()) {

            const token = isAuthenticated().token;

            create(token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        title: '',
                        body: '',
                        paragraph1: '',
                        paragraph2: '',
                        paragraph3: '',
                        address: '',
                        city: '',
                        region: '',
                        video: '',
                        photo: '',
                        photo1: '',
                        photo2: '',
                        photo3: '',
                        photo4: '',
                        photo5: '',
                        photo6: '',
                        categories: [],
                        category: [],
                        redirectToHome: true,
                        address: ''
                    });
                }

            });
        }
    };

    newPostForm = (categories) => (

        <form>

            <div>
                <label className="text-muted">Categories:</label>
                {categories.map((category, i) => {
                    return (
                        <div key={i}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={this.handleChange("category")}
                                    value={category._id}
                                />{' '}
                                {category.name}
                            </label>
                            <br />
                        </div>
                    )
                }
                )}
            </div>


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
                <label className="text-muted">Post Title:</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                // value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph 1:</label>
                <textarea
                    onChange={this.handleChange("paragraph1")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph 2:</label>
                <textarea
                    onChange={this.handleChange("paragraph2")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Paragraph 3:</label>
                <textarea
                    onChange={this.handleChange("paragraph3")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Address:</label>
                <input
                    onChange={this.handleChange("address")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">City:</label>
                <input
                    onChange={this.handleChange("city")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Region:</label>
                <input
                    onChange={this.handleChange("region")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Video:</label>
                <input
                    onChange={this.handleChange("video")}
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Photo 01:</label>
                <input
                    onChange={this.handleChangePhoto1("photo1")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Photo 02:</label>
                <input
                    onChange={this.handleChangePhoto2("photo2")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Photo 03:</label>
                <input
                    onChange={this.handleChangePhoto3("photo3")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Photo 04:</label>
                <input
                    onChange={this.handleChangePhoto4("photo4")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Photo 05:</label>
                <input
                    onChange={this.handleChangePhoto5("photo5")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Photo 06:</label>
                <input
                    onChange={this.handleChangePhoto6("photo6")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>


            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary mb-5"
            >
                Create Post
            </button>
        </form >

    );

    render() {
        const {
            categories,
            title,
            photo,
            photo1,
            photo2,
            photo3,
            photo4,
            photo5,
            photo6,
            error,
            loading,
            category,
            redirectToHome,
            paragraph1,
            paragraph2,
            paragraph3,
            address,
            city,
            region,
            video,
        } = this.state;

        if (redirectToHome) {
            return <Redirect to={'/'} />;
        }

        return (
            <div className="container" style={{ margin: "120px 0px" }}>
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                {this.newPostForm(categories, title, photo, category, photo1, photo2, photo3, photo4, photo5, photo6, paragraph1, paragraph2, paragraph3, address, city, region, video)}
            </div>
        );
    }
}

export default NewPost;
