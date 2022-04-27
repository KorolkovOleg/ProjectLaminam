import React, { Component} from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import CardCreate from "./CardCreate";
import CardElement from "./CardElement";
import {useCallback} from "react";
import CardEdit from "./CardEdit";
import cardSortSelect from "./CardSortSelect";
import CardSortSelect from "./CardSortSelect";
import AppNavbar from "../AppNavBar";

class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            editingCard: 0
        }

        this.postCard = this.postCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.putCard = this.putCard.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.sortCards = this.sortCards.bind(this);
    }

    componentDidMount() {
        fetch('/packages/' + this.props.match.params.packId + '/cards' + "?" + new URLSearchParams({isTimelyOnly: "false"}), {credentials: "include"})
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
            credentials: "include",
            body: JSON.stringify(card)
        });
        const content = await rawResponse.json();

        let currentCards = this.state.cards;
        currentCards.unshift(content);
        this.setState({cards: currentCards});
    }

    async putCard(card) {
        const rawResponse = await fetch('/packages/' + this.props.match.params.packId + '/cards/' + card.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(card)
        });
        const content = await rawResponse.json();

        let currentCards = this.state.cards.map(currentCard => {
            if(currentCard.id === card.id) {
                currentCard = card;
            }
            return currentCard;
        });
        this.setState({cards: currentCards});
        this.setState({editingCard: 0});
    }

    async deleteCard(id) {
        await fetch('/packages/' + this.props.match.params.packId + '/cards/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: "include"
        }).then(() => {
            let updatedCards = [...this.state.cards].filter(i => i.id !== id);
            this.setState({cards: updatedCards});
        });
    }

    handleEdit(id) {
        this.setState({editingCard: id});
    }

    sortCards(sortingMode) {
        let listOfCards = this.state.cards;
        switch(sortingMode) {
            case "byIdAscending": listOfCards.sort((a,b) => a.id - b.id); break;
            case "byIdDescending": listOfCards.sort((a,b) => b.id - a.id); break;
            case "byLabelStrait": listOfCards.sort((a,b) => new Intl.Collator().compare(a.label, b.label)); break;
            case "byLabelReverse": listOfCards.sort((a,b) => new Intl.Collator().compare(b.label, a.label)); break;
        }
        this.setState({cards: listOfCards});
    }

    render() {
        const cardList = this.state.cards.map(card => {
            let currentElement = null;

            if(card.id === this.state.editingCard) {
                currentElement = <CardEdit key={card.id} card={card} putCard={this.putCard}/>
            } else {
                currentElement = <CardElement key={card.id} card={card} deleteCard={this.deleteCard} editCard={this.handleEdit}/>
            }
           return currentElement;
        });

        return(
            <div>
                <AppNavbar/>
                <div className="container p-3">
                    <CardCreate postCard={this.postCard}/>
                    <CardSortSelect sortCards={this.sortCards}/>
                    <div>{cardList}</div>
                </div>
            </div>
        )
    }
}
export default CardList;