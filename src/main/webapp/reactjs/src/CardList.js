import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import CardCreate from "./CardCreate";

class CardList extends Component {

    constructor(props) {
        super(props);
        this.state = {cards: []};
        // this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/packages/' + this.props.match.params.packId + '/cards')
            .then(response => response.json())
            .then(data => this.setState({cards : data}));
    }

    async remove(id) {
        await fetch('/packages/' + this.props.packId + '/cards/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCards = [...this.state.cards].filter(i => i.id !== id);
            this.setState({cards: updatedCards});
        });
    }

    render() {

        const cardList = this.state.cards.map(card => {
            return <tr key={card.id}>
                <td style={{whiteSpace: 'nowrap'}}>{card.name} {card.frontSide} {card.backSide}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="danger" onClick={() => this.remove(card.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <CardCreate packId = {this.props.match.params.packId}/>
                <Container fluid>
                    <h2>Cards</h2>
                    <table>
                        {cardList}
                    </table>
                </Container>
            </div>
        );
    }
}
export default CardList;