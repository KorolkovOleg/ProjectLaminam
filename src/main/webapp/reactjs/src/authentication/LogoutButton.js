import React, {Component} from "react";
import {Button} from "reactstrap";
import {Redirect} from "react-router-dom";

class LogoutButton extends Component {


    constructor(props, context) {
        super(props, context);

        this.logoutHandler = this.logoutHandler.bind(this);

    }


    async logoutHandler(event) {
        await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        document.location.reload();
    }

    render() {

        return (
            <Button onClick={this.logoutHandler}>Logout</Button>
        )
    }
}

export default LogoutButton;