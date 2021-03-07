import React, { Component } from "react";
import { singleCategory, update } from "./apiCategories"
import { isAuthenticated } from "../auth";
import { Redirect } from "react-router-dom";



class EditCategory extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            redirectToHome: false,
            error: "",
            fileSize: 0,
            loading: false
        };
    }

    init = categoryId => {
        singleCategory(categoryId).then(data => {
            if (data.error) {
                this.setState({ redirectToHome: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        this.postData = new FormData();
        const categoryId = this.props.match.params.categoryId;
        this.init(categoryId);
    }

    isValid = () => {
        const { name, fileSize } = this.state;
        if (fileSize > 1000000000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (name.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        if (name.length < 4 || name.length > 40) {
            this.setState({ error: "Category Name must be between 4 and 40 characters", loading: false });
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
            const categoryId = this.props.match.params.categoryId;
            const token = isAuthenticated().token;

            update(categoryId, token, this.postData).then(data => {
                if (data.error) this.setState({ error: data.error });
                else {
                    this.setState({
                        loading: false,
                        name: "",
                        redirectToHome: true
                    });
                }
            });
        }
    };

    editCategoryForm = (name) => (
        <form>
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
                <label className="text-muted">Category Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update Category
            </button>
        </form>
    );

    render() {
        const {
            id,
            name,
            redirectToHome,
            error,
            loading
        } = this.state;

        if (redirectToHome) {
            return <Redirect to={`/`} />;
        }

        return (
            <div className="container" style={{ marginTop: "100px", marginBottom: "150px" }}>
                <h2 className="mt-5 mb-5">{name}</h2>

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
                        }/category/photo/${id}?${new Date().getTime()}`}

                    alt={name}
                />


                {isAuthenticated().user.role === "admin" &&
                    this.editCategoryForm(name)}

            </div>
        );
    }
}

export default EditCategory;
