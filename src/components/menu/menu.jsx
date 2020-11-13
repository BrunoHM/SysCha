import 'modules/bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import {Button, ButtonGroup, Container, Col, Dropdown} from 'react-bootstrap'

import './menu.css'

export default props => (
    <Container fluid className='border-bottom border-info'>
        <Col className='col-3 p-0 m-0'>
            <Button variant='dark' className='col-3' href='#/index'>
                Início
            </Button>
            <Dropdown as={ButtonGroup} className='col-2 p-0 m-0 d-inline-block'>
                <Dropdown.Toggle variant='dark' id='dropdown-custom-1'>
                    {<span className='glyphicon glyphicon-menu-hamburger' aria-hidden='true'></span>}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href='#/pessoas'>Pessoas</Dropdown.Item>
                    <Dropdown.Item href='#/usuarios'>Usuários</Dropdown.Item>
                    <Dropdown.Item href='#/perfis'>Perfis</Dropdown.Item>
                    <Dropdown.Item href='#/acoes'>Ações</Dropdown.Item>
                    <Dropdown.Item href='#/eventos'>Eventos</Dropdown.Item>
                    <Dropdown.Item href='#/dispositivos'>Dispositivos</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    </Container>
)