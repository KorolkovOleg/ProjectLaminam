import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';
import cardEdit from "./CardEdit";

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

    render() {

        const cardList = this.state.cards.map(card => {
            return <tr key={card.id}>
                <td style={{whiteSpace: 'nowrap'}}>{card.name} {card.frontSide} {card.backSide}</td>
                {/*<td>*/}
                {/*    <ButtonGroup>*/}
                {/*        <Button size="sm" color="primary" tag={Link} to={"/packages/" + pack.id}>Edit</Button>*/}
                {/*        <Button size="sm" color="primary" tag={Link} to={"/packages/" + pack.id + "/cards"}>Open</Button>*/}
                {/*        <Button size="sm" color="danger" onClick={() => this.remove(pack.id)}>Delete</Button>*/}
                {/*    </ButtonGroup>*/}
                {/*</td>*/}
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <h2>Cards</h2>
                    {cardList}
                </Container>
            </div>
        );
    }
}
export default CardList;