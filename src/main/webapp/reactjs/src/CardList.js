import React, { Component} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import CardCreate from "./CardCreate";
import CardElement from "./CardElement";
import {useCallback} from "react";

class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }

        this.postCard = this.postCard.bind(this);
    }

    componentDidMount() {
        fetch('/packages/' + this.props.match.params.packId + '/cards/')
            .then(response => response.json())
            .then(data => this.setState({cards: data}));
    }

    async postCard(card) {
        const rawResponse = await fetch('/packages/' + this.props.match.params.packId + '/cards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(card)
        });
        const content = await rawResponse.json();

        let currentCards = this.state.cards;
        currentCards.push(content);
        this.setState({cards: currentCards});
    }

    render() {
        const cardList = this.state.cards.map(card => {
           return(
             <CardElement key={card.id} card={card}/>
           );
        });

        return(
            <div className="container p-3">
                <CardCreate postCard={this.postCard}/>
                <div>{cardList}</div>
            </div>
        )
    }
}
export default CardList;