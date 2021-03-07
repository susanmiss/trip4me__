import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { create } from "./apiCategories";


class NewCategory extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            photo: "",
            error: "",
            fileSize: 0,
            loading: false,
            redirectToHome: false
        };
    }

    componentDidMount() {
        this.postData = new FormData();
        this.setState({ user: isAuthenticated().user });
    }

    isValid = () => {
        const { name, fileSize } = this.state;
        if (fileSize > 100000000000) {
            this.setState({
                error: "File size should be less than 1mb",
                loading: false
            });
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: "Category name required", loading: false });
            return false;
        }
        if (name.length < 4 || name.length > 40) {
            this.setState({ error: "Category name must be between 4 and 40 characters", loading: false });
            return false;
        }
        return true;
    };

    handleChange = name => event => {
        this.setState({ error: "" });
        const value = name === "photo" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photo" ? event.target.files[0].size : 0;

        this.postData.set(name, value);
        this.setState({ [name]: value, fileSize });

    };

    handleChangeInt = name => event => {
        this.setState({ error: "" });
        const value = name === "photoInt" ? event.target.files[0] : event.target.value;

        const fileSize = name === "photoInt" ? event.target.files[0].size : 0;

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
                        name: '',
                        photo: '',
                        redirectToHome: true
                    });
                }

            });
        }
    };

    newPostForm = (name, photo) => (
        <form data-test="form-element">
            <div className="form-group">
                <label className="text-muted">Category Photo</label>
                <input
                    onChange={this.handleChange("photo")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Category Name:</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary mb-5"
            >
                Create Category
            </button>
        </form>
    );

    render() {
        const {
            name,
            photo,
            error,
            loading,
            redirectToHome
        } = this.state;

        if (redirectToHome) {
            return <Redirect to={'/'} />;
        }

        return (
            <div className="container" style={{ margin: "120px 0px" }} >
                <h2 className="mt-5 mb-5">Create a new category</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                {this.newPostForm(name, photo)}
            </ div>
        );
    }
}

export default NewCategory;
