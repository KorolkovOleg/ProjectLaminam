import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";
import NextRepeatDateConverter from "./NextRepeatDateConverter";

class CardElement extends Component {

    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleDelete(event) {
        this.props.deleteCard(this.props.card.id);
    }

    handleEdit(event) {
        this.props.editCard(this.props.card.id);
    }

    render() {

        let repeatThough = NextRepeatDateConverter.getStringOfNextRepeatDate(this.props.card.nextRepeatDate);

        return(
            <div className="card p-1">
                <div className="row gx-1">
                    <div className="col">
                        <div className="p-3 border bg-light">{this.props.card.label}</div>
                    </div>
                    <div className="col">
                        <div className="p-3 border bg-light">{this.props.card.frontSide}</div>
                    </div>
                    <div className="col">
                        <div className="p-3 border bg-light">{this.props.card.backSide}</div>
                    </div>
                    <div className="col">
                        <div className="p-3 border bg-light">{repeatThough}</div>
                    </div>
                </div>
                <ButtonGroup>
                    <Button color="danger" onClick={this.handleDelete}>Delete</Button>
                    <Button color="secondary" onClick={this.handleEdit}>Edit</Button>
                </ButtonGroup>
            </div>
        );
    }
}
export default CardElement;