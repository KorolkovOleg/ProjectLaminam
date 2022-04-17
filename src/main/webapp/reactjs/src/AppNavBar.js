import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarToggler, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

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

        return <Navbar color="dark" dark expand="md">
            <NavbarBrand className="col-10" tag={Link} to="/">Laminam</NavbarBrand>
            <NavLink className="col-1" tag={Link} to="/auth/login">Login</NavLink>
            <NavLink className="col-1" tag={Link} to="/auth/register">Register</NavLink>
        </Navbar>;
    }
}