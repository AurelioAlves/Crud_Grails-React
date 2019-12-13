import React from 'react'
import Button from 'react-bootstrap/Button'

export default function (props) {
    const renderBandaList = () => {
        const BandaList = props.bandaList || []
        return BandaList.map((banda) =>(
                <tr key={banda.id}>
                  <td>{banda.nome}</td>
                  <td>{banda.genero}</td>
                    <td><Button variant='link' onClick={()=> props.handleRemoveBanda(banda.id)}>Remover</Button></td>
                    <td><Button variant='link' onClick={() => props.handleEditBanda(banda)}>Editar</Button></td>
                </tr>
        ))
    }
    return (
        <div>
            <table style={{width: 400}}>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Genero</th>
                    <th colSpan={2}>Opções</th>
                </tr>
                </thead>
                <tbody>
                {renderBandaList()}
                </tbody>

            </table>
        </div>
    )
}