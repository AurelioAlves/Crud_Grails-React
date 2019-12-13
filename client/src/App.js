import React, {Component} from 'react';
import 'whatwg-fetch';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Container from "react-bootstrap/Container";

class TesteList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shows: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/shows')
            .then(res => {
                this.setState({shows: res.data});
            })
    }

    render() {
        function renderShowList(show) {
            return (<tr key={show.id}>
                <td>{show.dataDoShow}</td>
                <td>{show.local.nome}</td>
                <td>{show.local.capacidade}</td>
                <td>{show.bandas.nome.join(', ')}</td>
                <td>{show.bandas.genero.join(', ')}</td>
            </tr>)
        }

        return (
            <Container>
                <div>
                    <table>
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Local</th>
                            <th>Capacidade</th>
                            <th>Banda</th>
                            <th>Genero</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.shows.map(renderShowList)}
                        </tbody>
                    </table>
                </div>
              <Link to="/banda">
                Link para Banda
              </Link><br/>
                <Link to="/local">
                    Link para Local
                </Link><br/>
                <Link to="/shows">
                    Link para Show
                </Link>
            </Container>
        )
    }
}

export default TesteList