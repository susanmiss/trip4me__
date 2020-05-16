import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { create } from "./apiPost";


class NewPost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            body: "",
            photo: "",
            photoInt: "",
            photoIntOne:"",
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
        const { title, body, fileSize } = this.state;
        if (fileSize > 100000000000) {
            this.setState({
                error: "File size should be less than 100kb",
                loading: false
            });
            return false;
        }
        if (title.length === 0 || body.length === 0 ) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        if (title.length < 4 || title.length > 40 ) {
            this.setState({ error: "Title must be between 4 and 40 characters", loading: false });
            return false;
        }
        if (body.length < 4 || body.length > 3000) {
            this.setState({ error: "Body must be between 4 and 3000 characters", loading: false });
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

    handleChangeInt1 = name => event => {
      this.setState({ error: "" });
      const value = name === "photoIntOne" ? event.target.files[0] : event.target.value;

      const fileSize = name === "photoIntOne" ? event.target.files[0].size : 0;

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
                    title:'',
                    body:'',
                    photo:'',
                    photoInt: "",
                    photoIntOne: "",
                    redirectToHome: true
                   });
                }

            });
        }
    };

    newPostForm = (title, body, photo, photoInt, photoIntOne) => (
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
                <label className="text-muted">Post Title:</label>
                <input
                    onChange={this.handleChange("title")}
                    type="text"
                    className="form-control"
                    value={title}
                />
            </div>

            <div className="form-group">
                <label className="text-muted">My Post body:</label>
                <textarea
                    onChange={this.handleChange("body")}
                    type="text"
                    className="form-control"
                    value={body}
                />
            </div>


            <div className="form-group">

                <label className="text-muted">Post Internal Photo</label>
                <input
                    onChange={this.handleChangeInt("photoInt")}
                    type="file"
                    accept="image/*"
                    className="form-control"
                />
            </div>

            <div className="form-group">
                <label className="text-muted">Post Internal Photo</label>
                <input
                    onChange={this.handleChangeInt1("photoIntOne")}
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
        </form>
    );

    render() {
        const {
            title,
            body,
            photo,
            photoInt,
            photoIntOne,
            error,
            loading,
            redirectToHome
        } = this.state;

        if (redirectToHome) {
            return <Redirect to={'/'} />;
        }

        return (
            <div className="container" style={{margin: "120px"}} >
                <h2 className="mt-5 mb-5">Create a new post</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>
                {this.newPostForm(title, body, photo, photoInt, photoIntOne)}
            </div>
        );
    }
}

export default NewPost;
