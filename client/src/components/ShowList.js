import React from 'react'
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function (props) {
    const renderShowsList = () => {
        const showsList = props.showsList
        return showsList.map((show => (
                <tr key={show.id}>
                    <td>{show.dataDoShow}</td>
                    <td>{show.local.nome}</td>
                    <td><Button variant='link' onClick={() => props.handleRemoveShows(show.id)}>Remover</Button></td>
                    <td><Button variant='link' onClick={() => props.handleEditShows(show)}>Editar</Button></td>
                </tr>

            )
        ))

    }
    const renderBandaList = () => {
        const bandaList = props.bandaList
        return bandaList.map((banda => (
            <tr key={banda.id}>
                <td>{banda.nome}</td>
                <td><Button variant='link' onClick={() => props.handleVincularBandas(banda.id)}>Associar</Button></td>
                <td><Button variant='link' onClick={() => props.handleDesvincularBandas(banda.id)}>Desvincular</Button></td>
            </tr>
        )))
    }
    function teste(associados){
        return(
            <div>
                {associados}
            </div>
        )
    }
    return (
        <div style={{width: 1000}}>
            <Row>
                <Col>
                    <table>
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Lugar</th>
                            <th colSpan={2}>Opções</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderShowsList()}
                        </tbody>
                    </table>
                    {props.associadosList.map(teste)}
                </Col>
                <Col>
                    <table>
                        <thead>
                        <tr>
                            <th>Banda</th>
                            <th colSpan={2}>Opções</th>
                        </tr>
                        </thead>
                        <tbody>
                        {renderBandaList()}
                        </tbody>
                    </table>
                </Col>
            </Row>
        </div>
    )
}