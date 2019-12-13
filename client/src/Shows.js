import React, {Component} from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ShowList from './components/ShowList'
import Col from "react-bootstrap/Col";

export default class Shows extends Component {
    constructor(props) {
        super(props)

        this.state = {shows: [], local: [], banda: [], associados:[], data: '', id: null, localId: ''}

        this.handleRemoveShows = this.handleRemoveShows.bind(this)
        this.handleChangeData = this.handleChangeData.bind(this)
        this.handleChangeLocal = this.handleChangeLocal.bind(this)
        this.handleAddShows = this.handleAddShows.bind(this)
        this.handleEditShows = this.handleEditShows.bind(this)
        this.handleVincularBandas = this.handleVincularBandas.bind(this)
        this.handleDesvincularBandas = this.handleDesvincularBandas.bind(this)
        this.renderLocalList = this.renderLocalList.bind(this)
    }

    componentDidMount() {
        axios.get('http://localhost:8080/shows')
            .then(res => {
                this.setState({shows: res.data})
            })
            .catch(error => {
                console.log(error)
            })

        axios.get('http://localhost:8080/local')
            .then(res => {
                this.setState({local: res.data, localId: res.data[0].id})
            })
            .catch(error => {
                console.log(error)
            })

        axios.get('http://localhost:8080/banda')
            .then(res => {
                this.setState({banda: res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleRemoveShows(id) {
        axios.delete('http://localhost:8080/shows/' + id)
            .then(res => {
                this.componentDidMount()

            })
            .catch(error => {
                alert("Não foi possível deletar")
                console.log(error)
            })
    }

    handleAddShows(e) {
        if (!this.state.data.length) {
            return
        }

        const data = this.state.data
        const localId = this.state.localId
        const id = this.state.id
        if (id != null) {
            axios({
                method: 'put',
                url: 'http://localhost:8080/shows' + id,
                data: {
                    data: data
                }
            }).then(res => {
                this.componentDidMount()
                this.setState({data: '', id: null, associados:[]})
            }).catch(error => {
                console.log(error)
            })
        } else {
            try{
            axios({
                method: 'post',
                url: 'http://localhost:8080/shows',
                data:{
                    dataDoShow: data,
                    localId: localId
                }
            }).then(res => {
                this.componentDidMount()
                this.setState({data: '',localId:'', associados:[]})
                console.log(res)
            }).catch(error => {
                console.log(data)
            })}catch (e) {
                console.log(e)
            }
        }
    }

    handleVincularBandas(banda) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/shows/vincular',
            data:{
                ShowsId: this.state.id,
                BandaId: banda
            }
        }).then(res => {
           this.componentDidMount()
            this.setState({data: '',localId:'', associados:[]})
        }).catch(error => {
            console.log(error)
        })
    }

    handleDesvincularBandas(banda) {
        axios({
            method: 'post',
            url: 'http://localhost:8080/shows/desvincular',
            data:{
                ShowsId: this.state.id,
                BandaId: banda
            }
        }).then(res => {
            this.componentDidMount()
            this.setState({data: '',localId:'', associados:[]})
        }).catch(error => {
            console.log(error)
        })
    }

    handleEditShows(show) {
        let dia = show.dataDoShow.split("/")[0]
        let mes = show.dataDoShow.split("/")[1]
        let ano = show.dataDoShow.split("/")[2]
        const dataFinal = ano + "-" + mes + "-" + dia
        this.setState({data: dataFinal, id: show.id, localId: show.local.id, associados:show.bandas.nome})
        console.log(this.state.associados)
    }

    handleChangeData(e) {
        this.setState({...this.state, data: e.target.value})
    }

    handleChangeLocal(e) {
        this.setState({...this.state, localId: e.target.value})
    }

    renderLocalList(local){
        return(
            <option key={local.id} value={local.id}>{local.nome}</option>
        )
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md={{offset:1}}>
                        Adicionar Shows <br/>
                        Data: <input type="date" value={this.state.data} onChange={this.handleChangeData}/><br />
                        Local:<select value={this.state.localId} onChange={this.handleChangeLocal}>
                        {this.state.local.map(this.renderLocalList)}
                    </select><br/>
                        <Button variant="primary" onClick={() => this.handleAddShows()}>Salvar</Button>
                    </Col>
                    <Col>
                        <ShowList showsList={this.state.shows}
                                  bandaList={this.state.banda}
                                  handleRemoveShows={this.handleRemoveShows}
                                  handleEditShows={this.handleEditShows}
                                  handleVincularBandas={this.handleVincularBandas}
                                  associadosList={this.state.associados}
                                  handleDesvincularBandas={this.handleDesvincularBandas}>
                        </ShowList>
                        <Link to="/">
                            Voltar
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }

}