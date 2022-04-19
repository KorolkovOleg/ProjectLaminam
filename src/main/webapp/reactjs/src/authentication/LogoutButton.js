import React, {Component} from "react";
import {Button} from "reactstrap";
import {Redirect} from "react-router-dom";

class LogoutButton extends Component {


    constructor(props, context) {
        super(props, context);

        this.logoutHandler = this.logoutHandler.bind(this);

        this.state = {
            isLogout: false
        }
    }


    async logoutHandler(event) {
        await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        this.setState({isLogout: true});
    }

    render() {

        if(this.state.isLogout) {
            return <Redirect to="/"/>;
        }

        return (
            <Button onClick={this.logoutHandler}>Logout</Button>
        )
    }
}

export default LogoutButton;