import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";

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
                </div>
                <div className="row gx-1">
                    <div className="col-2 gy-1">
                        <Button className="p-1" color="danger" onClick={this.handleDelete}>Delete</Button>
                    </div>
                    <div className="col-2 gy-1">
                        <Button className="p-1" color="secondary" onClick={this.handleEdit}>Edit</Button>
                    </div>
                </div>
            </div>
        );
    }
}
export default CardElement;