import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PackList from './packages/PackList';
import PackEdit from "./packages/PackEdit";
import CardList from "./cards/CardList";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

class App extends Component {


    render() {

        let isAuth = document.cookie.replace(/(?:(?:^|.*;\s*)isAuthorised\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        return (
            <Router>
                <Switch>
                    <PrivateRoute isAuthenticated={isAuth} exact={true} path='/test' component={Register}/>
                    <Route path='/' exact={true} component={Home}/>
                    <PrivateRoute isAuthenticated={isAuth} path='/packages' exact={true} component={PackList}/>
                    <PrivateRoute isAuthenticated={isAuth} path='/packages/:packId' exact={true} component={PackEdit}/>
                    <PrivateRoute isAuthenticated={isAuth} path='/packages/:packId/cards' component={CardList}/>
                    <PublicRoute isAuthenticated={isAuth} path='/auth/login' component={Login}/>
                    <PublicRoute isAuthenticated={isAuth} path='/auth/register' component={Register}/>
                </Switch>
            </Router>
        )
    }
}

export default App;