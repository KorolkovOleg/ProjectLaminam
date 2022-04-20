import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";

class CardViewerElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFrontSide: true
        }
    }

    render() {

        let currentSide = this.state.isFrontSide ? (
            <div className="card-body">
                <p className="card-text">{this.props.card.frontSide}</p>
            </div>
        ) : (
            <div className="card-body">
                <p className="card-text">{this.props.card.backSide}</p>
            </div>
        )

        return(
            <div className="card text-center">
                <div className="card-header">
                    {this.props.card.label}
                </div>
                {currentSide}
            </div>
        );
    }
}
export default CardViewerElement;