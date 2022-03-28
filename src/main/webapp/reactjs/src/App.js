import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PackList from './PackList';
import PackEdit from "./PackEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home}/>
                    <Route path='/packages' exact={true} component={PackList}/>
                    <Route path='/packages/:id' component={PackEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;