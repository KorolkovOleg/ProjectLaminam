import {Component} from "react";
import Cookies from 'universal-cookie';

class Login extends Component {


    constructor(props) {
        super(props);

        this.state = {
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
        const content = await rawResponse.json();
        alert(JSON.stringify(content));
        //
        // let currentCards = this.state.cards;
        // currentCards.unshift(content);
        // this.setState({cards: currentCards});

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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} name="username" id="username" value={this.state.user.username}/>
                    <input onChange={this.handleChange} name="password" id="password" value={this.state.user.password}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}
export default Login;