import React, {Component} from "react";
import AppNavbar from "../AppNavBar";
import {Button} from "reactstrap";
import {Link, Redirect} from "react-router-dom";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorText: "",
            isError: false,
            isRegisterSuccess: false,
            user: {
                username: "",
                password: "",
                passwordRepeat: ""
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();

        if(this.isFieldsFilled() && this.isPasswordsMatch()) {
            const rawResponse = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.state.user)
            });
            if (rawResponse.status === 409) {
                this.setState({
                    isError: true,
                    errorText: "Username already exist"
                });
            } else {
                this.setState({isError: false, isRegisterSuccess: true})
            }
        }
    }

    isFieldsFilled() {
        if(this.state.user.username !== "" && this.state.user.password !== "" && this.state.user.passwordRepeat !== "") {
            return true;
        } else {
            this.setState({isError: true,
                                errorText: "Fill all fields"});
            return false;
        }
    }

    isPasswordsMatch() {
        if(this.state.user.password === this.state.user.passwordRepeat) {
            return true;
        } else {
            this.setState({isError: true,
                errorText: "Passwords not match"});
            return false;
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

        let error = (
            <div hidden={!this.state.isError} className="alert alert-danger" role="alert">
                {this.state.errorText}
            </div>
        )

        if(this.state.isRegisterSuccess) {
            return <Redirect to="/auth/login"/>
        }

        return (
            <div>
                <AppNavbar/>
                <div className="d-flex justify-content-center">
                    <div className="col-4">
                        <form onSubmit={this.handleSubmit} role="form">
                            {error}
                            <div className="form-group pt-5 ">
                                <label htmlFor="username" className="form-label" >Username</label>
                                <input className="form-control" onChange={this.handleChange} name="username" id="username" value={this.state.user.username}/>
                            </div>
                            <div className="form-group pt-4 ">
                                <label htmlFor="password" className="form-label" >Password</label>
                                <input className="form-control" onChange={this.handleChange} name="password" id="password" value={this.state.user.password}/>
                            </div>
                            <div className="form-group pt-4 ">
                                <label htmlFor="passwordRepeat" className="form-label" >Confirm password</label>
                                <input className="form-control" onChange={this.handleChange} name="passwordRepeat" id="passwordRepeat" value={this.state.user.passwordRepeat}/>
                            </div>
                            <div className="button-group pt-5 d-grid gap-2 d-md-flex ">
                                <Button type="submit" color="primary" outline="true">Register</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;