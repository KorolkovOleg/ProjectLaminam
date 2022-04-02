import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";

class CardElement extends Component {

    constructor(props) {
        super(props);
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

            </div>
        );
    }
}
export default CardElement;