import React, {Component} from 'react';
import {Button, ButtonGroup, Navbar, NavbarBrand, NavbarToggler, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import LogoutButton from "./authentication/LogoutButton";

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        let isAuth = document.cookie.replace(/(?:(?:^|.*;\s*)isAuthorised\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        let authBar = isAuth ? (
            <div>
                <LogoutButton/>
            </div>
        ) : (
            <div>
                <Button color="secondary" tag={Link} to="/auth/login">Login</Button>
                <Button color="secondary" tag={Link} to="/auth/register">Register</Button>
            </div>
        )

        return <Navbar color="dark" dark expand="md">
            <NavbarBrand className="col-10" tag={Link} to="/">Laminam</NavbarBrand>
            <ButtonGroup>
                {authBar}
            </ButtonGroup>
        </Navbar>;
    }
}