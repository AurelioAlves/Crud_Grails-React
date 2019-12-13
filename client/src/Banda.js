import React, {Component} from 'react'
import axios from 'axios';
import BandaList from './components/bandaList'
import {Link} from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class Banda extends Component {
    constructor(props) {
        super(props);

        this.state = {banda: [], nome: '', genero: 'Rock', id: null}

        this.handleRemoveBanda = this.handleRemoveBanda.bind(this)
        this.handleChangeNome = this.handleChangeNome.bind(this)
        this.handleChangeGenero = this.handleChangeGenero.bind(this)
        this.handleAddBanda = this.handleAddBanda.bind(this)
        this.handleEditBanda = this.handleEditBanda.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/banda')
            .then(res => {
                this.setState({banda: res.data})
                console.log(this.state.banda)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRemoveBanda(id) {
        axios.delete('http://localhost:8080/banda/' + id)
            .then(res => {
                this.componentDidMount()

            })
            .catch(error => {
                alert("Não foi possível deletar")
                console.log(error)
            })
    }

    handleEditBanda(banda){
         this.setState({nome:banda.nome, genero: banda.genero, id: banda.id})

    }

    handleChangeNome(e) {
        this.setState({...this.state, nome: e.target.value})
    }

    handleChangeGenero(e){
        this.setState({genero: e.target.value})
    }

    handleAddBanda(e){
        if(!this.state.nome.length && !this.state.genero.length){
            return
        }

        const nome = this.state.nome
        const genero = this.state.genero
        const id = this.state.id

        if(id != null){
            axios({
                method: 'put',
                url: 'http://localhost:8080/banda/' + id,
                data:{
                    nome: nome,
                    genero: genero
                }
            }).then(res => {
                this.componentDidMount()
                this.setState({nome:'', genero:'Rock', id: null})
            }).catch(error => {
                console.log(error)
            })
        }else{
        axios({
            method: 'post',
            url: 'http://localhost:8080/banda',
            data:{
                nome: nome,
                genero: genero
            }
        }).then(res => {
            this.componentDidMount()
            this.setState({nome:'', genero:'Rock'})
        }).catch(error => {
            console.log(error)
        })}
    }

    render() {
        return (
            <Container>
                <Row>
                    <div>
                        Adicionar Banda <br />
                        Nome <br /> <input placeholder="Inserir Nome"
                               onChange={this.handleChangeNome}
                               value={this.state.nome}/>
                        <br />
                        Genero <br /> <select value={this.state.genero} onChange={this.handleChangeGenero}>
                        <option onSelect={this.handleChangeGenero} value="Rock">Rock</option>
                        <option onSelect={this.handleChangeGenero} value="Forro">Forro</option>
                        <option onSelect={this.handleChangeGenero} value="Axe">Axe</option>
                    </select>
                         <Button variant="primary" onClick={() => this.handleAddBanda()}>Salvar</Button>
                    </div>
                    <Col>
                        <BandaList bandaList={this.state.banda}
                                   handleRemoveBanda={this.handleRemoveBanda}
                                   handleEditBanda={this.handleEditBanda}>
                        </BandaList>
                        <Link to="/">
                            Voltar
                        </Link>
                    </Col>
                </Row>
            </Container>
        )

    }
}

export default Banda