import 'modules/bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import {Button, Container, FormControl, InputGroup, Row, Table} from 'react-bootstrap'

import Menu from '../menu/menu'

export default props => (
    <Container fluid className='p-0 m-0'>
        <Menu/>
        
        <Row className='col-10'>
            <InputGroup className='col-3'>
                <FormControl
                    placeholder='Nome'
                    aria-label='Nome'
                    aria-describedby='nome da pessoa'
                />
            </InputGroup>
            <InputGroup className='col-3 offset-1'>
                <FormControl
                    placeholder='sobrenome'
                    aria-label='sobrenome'
                    aria-describedby='sobrenome da pessoa'
                />
            </InputGroup>
            
            <Button variant="dark" className='col-1'>Pesquisar</Button>
        </Row>

        <Row>
            <Table striped bordered hover variant="dark" className='col-11'>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        </Row>

    </Container>
)

