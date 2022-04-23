import React, {Component} from "react";
import CardViewerElement from "./CardViewerElement";
import {Container} from "reactstrap";
import AppNavbar from "../../AppNavBar";
import CardRepeatManager from "./CardRepeatManager";

class CardViewer extends Component {


    constructor(props, context) {
        super(props, context);

        this.state = {
            cards: [],
            currentCardIndex: 0
        }

        this.handleNextCard = this.handleNextCard.bind(this);
        this.handlePreviousCard = this.handlePreviousCard.bind(this);
        this.putCard = this.putCard.bind(this);
    }

    componentDidMount() {
        fetch('/packages/' + this.props.match.params.packId + '/cards/', {credentials: "include"})
            .then(response => response.json())
            .then(data => this.setState({cards: data}));
    }

    async putCard(currentCard) {
        const rawResponse = await fetch('/packages/' + this.props.match.params.packId + '/cards/' + currentCard.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(currentCard)
        });

        alert(JSON.stringify(rawResponse.body));
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
        }).map(card => <CardViewerElement key={card.id} card = {card}
                                          handleNextCard = {this.handleNextCard}
                                          handlePreviousCard = {this.handlePreviousCard}/>);

        return(<div>
            <AppNavbar/>
            <Container>
                <div className="d-flex justify-content-center">
                    <div className="col-6 pt-5 ">
                        <CardRepeatManager card = {this.state.cards[this.state.currentCardIndex]} putCard = {this.putCard}/>
                        {currentCard}
                    </div>
                </div>
            </Container>
        </div>);
    }
}
export default CardViewer;