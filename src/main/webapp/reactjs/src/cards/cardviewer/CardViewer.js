import React, {Component} from "react";
import CardViewerElement from "./CardViewerElement";
import CardElement from "../CardElement";
import cardViewerElement from "./CardViewerElement";
import {Container} from "reactstrap";

class CardViewer extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            cards: [],
            currentCardId: 0
        }
    }

    componentDidMount() {
        fetch('/packages/' + this.props.match.params.packId + '/cards/', {credentials: "include"})
            .then(response => response.json())
            .then(data => this.setState({cards: data}));
    }

    render() {

        let currentCard = this.state.cards.filter((card, index) => {
            if(index === 1) {
                return card;
            }
        }).map(card => <CardViewerElement card = {card}/>);

        return(<div>
            <Container>
                <div className="d-flex justify-content-center">
                    <div className="col-6 pt-5 ">
                        {currentCard}
                    </div>
                </div>
            </Container>
        </div>);
    }
}
export default CardViewer;