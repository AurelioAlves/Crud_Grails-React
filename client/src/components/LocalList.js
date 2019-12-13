import  React from 'react'
import Button from "react-bootstrap/Button";


export default function (props){
    const renderLocalList = () => {
        const localList = props.localList || []
        return localList.map((local) => (
            <tr key={local.id}>
                <td>{local.nome}</td>
                <td>{local.capacidade}</td>
                <td><Button variant='link' onClick={()=> props.handleRemoveLocal(local.id)}>Remover</Button></td>
                <td><Button variant='link' onClick={() => props.handleEditLocal(local)}>Editar</Button></td>
            </tr>
        ))
    }
    return(
        <div>
            <table style={{width: 400}}>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>Capacidade</th>
                    <th colSpan={2}>Opções</th>
                </tr>
                </thead>
                <tbody>
                {renderLocalList()}
                </tbody>

            </table>
        </div>
    )
}