import React, {Component} from "react";
import LogoutButton from "./LogoutButton";
import {Link, Redirect} from "react-router-dom";
import {Button} from "reactstrap";
import AppNavbar from "../AppNavBar";

class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
            authenticationError: false,
            user: {
                username: "",
                password: ""
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const rawResponse = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(this.state.user)
        });
        if(rawResponse.ok) {
            this.setState({authenticationError: false, isAuthenticationSuccess: true});
            document.location.reload();
        } else {
            this.setState({authenticationError: true});
        }

    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }

    render() {

        let authError = (
                            <div  hidden={!this.state.authenticationError} className="alert alert-danger" role="alert">
                                Invalid username or password
                            </div>
                        )

        return (
            <div>
                <AppNavbar/>
                    <div className="d-flex justify-content-center">
                        <div className="col-4">
                            <form onSubmit={this.handleSubmit} role="form">
                                {authError}
                                <div className="form-group pt-5 ">
                                    <label htmlFor="username" className="form-label" >Username</label>
                                    <input type="text" className="form-control" onChange={this.handleChange} name="username" id="username" value={this.state.user.username}/>
                                </div>
                                <div className="form-group pt-4">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" onChange={this.handleChange} name="password" id="password" value={this.state.user.password}/>
                                </div>
                                <div className="button-group pt-5 d-grid gap-2 d-md-flex ">
                                    <Button type="submit" color="primary" outline="true">Login</Button>
                                </div>
                            </form>
                        </div>
                    </div>
            </div>
        )
    }
}
export default Login;