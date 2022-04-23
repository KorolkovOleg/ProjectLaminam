import React, {Component} from "react";
import {Button, ButtonGroup} from "reactstrap";
import CardRepeatManager from "./CardRepeatManager";

class CardViewerElement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFrontSide: true
        }

        this.turnOver = this.turnOver.bind(this);
    }

    turnOver() {
        let currentIsFrontSide = this.state.isFrontSide;
        this.setState({isFrontSide: !currentIsFrontSide});
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
            <div className="card text-center"  style={{minHeight: "30rem"}}>
                <div className="card-header">
                    {this.props.card.label}
                </div>
                {currentSide}
                <ButtonGroup>
                    <Button className="primary" onClick={this.props.handlePreviousCard}>Previous card</Button>
                    <Button className="primary" onClick={this.turnOver}>Turn over</Button>
                    <Button className="primary" onClick={this.props.handleNextCard}>Next card</Button>
                </ButtonGroup>
            </div>
        );
    }
}
export default CardViewerElement;