import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavBar';
import { Link } from 'react-router-dom';

class PackList extends Component {

    constructor(props) {
        super(props);
        this.state = {packages: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/packages')
            .then(response => response.json())
            .then(data => this.setState({packages: data}));
    }

    async remove(id) {
        await fetch(`/packages/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedPackages = [...this.state.packages].filter(i => i.id !== id);
            this.setState({packages: updatedPackages});
        });
    }

    render() {
        const {packages, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const packagesList = packages.map(pack => {
            return <tr key={pack.id}>
                <td style={{whiteSpace: 'nowrap'}}>{pack.name}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/packages/" + pack.id}>Edit</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/packages/" + pack.id + "/cards"}>Open</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(pack.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/packages/new">Add Package</Button>
                    </div>
                    <h3>Packages</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="30%">Name</th>
                            <th width="40%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {packagesList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default PackList;