import React, {Component} from "react";
import CardViewerElement from "./CardViewerElement";
import CardElement from "../CardElement";
import cardViewerElement from "./CardViewerElement";
import {Container} from "reactstrap";
import AppNavbar from "../../AppNavBar";

class CardViewer extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            cards: [],
            currentCardIndex: 0
        }

        this.handleNextCard = this.handleNextCard.bind(this);
        this.handlePreviousCard = this.handlePreviousCard.bind(this);
    }

    componentDidMount() {
        fetch('/packages/' + this.props.match.params.packId + '/cards/', {credentials: "include"})
            .then(response => response.json())
            .then(data => this.setState({cards: data}));
    }

    handleNextCard() {
        if(this.state.currentCardIndex < this.state.cards.length - 1) {
            let currentCardIndex = this.state.currentCardIndex;
            this.setState({currentCardIndex: currentCardIndex + 1});
        }
    }

    handlePreviousCard() {
        if(this.state.currentCardIndex > 0) {
            let currentCardIndex = this.state.currentCardIndex;
            this.setState({currentCardIndex: currentCardIndex - 1});
        }
    }

    render() {
        let currentCard = this.state.cards.filter((card, index) => {
            if(index === this.state.currentCardIndex) {
                return card;
            }
        }).map(card => <CardViewerElement card = {card}
                                          handleNextCard = {this.handleNextCard}
                                          handlePreviousCard = {this.handlePreviousCard}/>);

        return(<div>
            <AppNavbar/>
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