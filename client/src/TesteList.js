import React, {Component} from 'react';
import 'whatwg-fetch';
import './css/App.css';
import './css/grails.css';
import './css/main.css';
import axios from 'axios'

class TesteList extends Component{
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

    render(){
        function formatData(date){
            let teste = date
            let teste2 = new Date(teste)
            let year = teste2.getFullYear()
            let month = teste2.getMonth()
            let dt = teste2.getDate()

            if(dt > 10){
                dt = '0' + dt
            }
            if(month < 10){
                month = '0' + month;
            }
            return (dt + '/' + month + '/' + year )
        }
        function renderShowList(show){
            return (<tr key={show.id}>
                <td>{formatData(show.data)}</td>
                <td>{show.local.nome}</td>
                <td>{show.local.capacidade}</td>
                <td>{show.bandas.nome.join(', ')}</td>
                <td>{show.bandas.genero.join(', ')}</td>
            </tr>)
        }

        return <div style={{width: 400}}>
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
    }
}

export default TesteList