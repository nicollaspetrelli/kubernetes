import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import './App.scss';

export default class App extends React.Component {
    state = {
        data: null
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_API_URL + '/users', {withCredentials: true})
            .then(res => {
                const data = res.data;
                this.setState({data});
            })
    }

    render() {
        if (this.state.data === null) {
            return (
                <Container className="text-center h-100 center-loading">
                    <Spinner animation="border" role="status" variant="secondary">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
            )
        }

        return (
            <Container>
                <h1 className="display-1">The Amazing App</h1>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.data.map((row) => {
                            return (
                                <tr>
                                    <td><code>{ row._id }</code></td>
                                    <td>{ row.email }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Container>
        );
    }
}
