import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
import LocalList from './components/LocalList'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

class Local extends Component {
    constructor(props) {
        super(props)

        this.state = {local: [], nome: '', capacidade: '', id: null}

        this.handleAddLocal = this.handleAddLocal.bind(this)
        this.handleChangeCapacidade = this.handleChangeCapacidade.bind(this)
        this.handleChangeNome = this.handleChangeNome.bind(this)
        this.handleEditLocal = this.handleEditLocal.bind(this)
        this.handleRemoveLocal = this.handleRemoveLocal.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/local')
            .then(res => {
                this.setState({local: res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleChangeNome(e) {
        this.setState({...this.state, nome: e.target.value})
    }

    handleChangeCapacidade(e) {
        this.setState({...this.state, capacidade: e.target.value})
    }

    handleAddLocal() {
        if (!this.state.nome.length && !this.state.capacidade.length) {
            return
        }

        const nome = this.state.nome
        const capacidade = this.state.capacidade
        const id = this.state.id

        if (id != null) {
            axios({
                method: 'put',
                url: 'http://localhost:8080/local/' + id,
                data: {
                    nome: nome,
                    capacidade: capacidade
                }
            }).then(res => {
                this.componentDidMount()
                this.setState({nome: '', capacidade: '', id: null})
            }).catch(error => {
                console.log(error)
            })
        } else {
            axios({
                method: 'post',
                url: 'http://localhost:8080/local',
                data: {
                    nome: nome,
                    capacidade: capacidade
                }
            }).then(res => {
                this.componentDidMount()
                this.setState({nome: '', capacidade: ''})
            }).catch(error => {
                console.log(error)
            })
        }
    }

    handleRemoveLocal(id) {
        axios.delete('http://localhost:8080/local/' + id)
            .then(res => {
                this.componentDidMount()
            }).catch(error => {
            alert("Não foi possível deletar")
        })
    }

    handleEditLocal(local) {
        this.setState({nome: local.nome, capacidade: local.capacidade, id: local.id})
    }

    render() {
        return (
            <Container>
                <Row>
                    <div>
                        Adicionar Local <br/>
                        Nome <br/> <input placeholder="Inserir Nome"
                                          onChange={this.handleChangeNome}
                                          value={this.state.nome}/>
                        <br/>
                        Capacidade <br/> <input placeholder="Inserir Capacidade"
                                                onChange={this.handleChangeCapacidade}
                                                value={this.state.capacidade}/>
                        <br/>
                        <Button variant="primary" onClick={() => this.handleAddLocal()}>Salvar</Button>
                    </div>
                    <Col>
                        <LocalList localList={this.state.local}
                                   handleRemoveLocal={this.handleRemoveLocal}
                                   handleEditLocal={this.handleEditLocal}>
                        </LocalList>
                        <Link to="/">
                            Voltar
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Local