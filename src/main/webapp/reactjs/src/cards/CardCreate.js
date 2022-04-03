import React, {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

class CardCreate extends Component {

    emptyItem = {
        label: "",
        frontSide: "",
        backSide: ""
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.postCard(this.state.item);
        this.setState({item: this.emptyItem});
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="card p-1">
                    <div className="row gx-1">
                        <div className="col">
                            <input className="p-2 border bg-light container-fluid" name="label" id="label" onChange={this.handleChange} value={this.state.item.label}/>
                        </div>
                        <div className="col">
                            <input className="p-2 border bg-light container-fluid" name="frontSide" id="frontSide" onChange={this.handleChange} value={this.state.item.frontSide}/>
                        </div>
                        <div className="col">
                            <input className="p-2 border bg-light container-fluid" name="backSide" id="backSide" onChange={this.handleChange} value={this.state.item.backSide}/>
                        </div>
                    </div>
                    <div className="row gx-1">
                        <div className="col-2 gy-1">
                            <Button className="p-1" type="submit">Create</Button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
export default CardCreate;