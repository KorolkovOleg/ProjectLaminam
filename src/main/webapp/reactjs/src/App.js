import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PackList from './packages/PackList';
import PackEdit from "./packages/PackEdit";
import CardList from "./cards/CardList";
import Login from "./authentication/Login";
import Register from "./authentication/Register";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/packages' exact={true} component={PackList}/>
                    <Route path='/packages/:packId' exact={true} component={PackEdit}/>
                    <Route path='/packages/:packId/cards' component={CardList}/>
                    <Route path='/auth/login' component={Login}/>
                    <Route path='/auth/register' component={Register}/>
                </Switch>
            </Router>
        )
    }
}

export default App;