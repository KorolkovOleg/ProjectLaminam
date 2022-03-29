import React, {Component} from "react";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

class CardCreate extends Component {

    emptyItem = {
        label: '',
        frontSide: '',
        backSide: ''
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = this.state.item;
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/packages/' + this.props.packId + '/cards', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        // this.props.history.push('/clients');
    }

    render() {
        return(
            <div>
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="label">Label</Label>
                        <Input type="text" name="label" id="label"
                               onChange={this.handleChange} autoComplete="label"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="frontSide">Front side</Label>
                        <Input type="text" name="frontSide" id="frontSide"
                               onChange={this.handleChange} autoComplete="frontSide"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="backSide">Back side</Label>
                        <Input type="text" name="backSide" id="backSide"
                               onChange={this.handleChange} autoComplete="backSide"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                    </FormGroup>
                </Form>
            </Container>
        </div>
        );

    }

}
export default CardCreate;