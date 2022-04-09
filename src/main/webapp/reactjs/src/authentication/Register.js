import {Component} from "react";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            errorText: "",
            isError: false,

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
                this.setState({isError: false});
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

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {error}
                    <input onChange={this.handleChange} name="username" id="username" value={this.state.user.username}/>
                    <input onChange={this.handleChange} name="password" id="password" value={this.state.user.password}/>
                    <input onChange={this.handleChange} name="passwordRepeat" id="passwordRepeat" value={this.state.user.passwordRepeat}/>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
export default Register;