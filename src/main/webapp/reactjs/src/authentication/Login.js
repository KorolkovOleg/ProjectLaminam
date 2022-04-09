import {Component} from "react";

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
            this.setState({authenticationError: false});
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
                            <div hidden={!this.state.authenticationError} className="alert alert-danger" role="alert">
                                Invalid username or password
                            </div>
                        )

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {authError}
                    <input onChange={this.handleChange} name="username" id="username" value={this.state.user.username}/>
                    <input onChange={this.handleChange} name="password" id="password" value={this.state.user.password}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}
export default Login;