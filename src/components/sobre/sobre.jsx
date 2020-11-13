import React from 'react'

import {Col, Container} from 'react-bootstrap'

import './sobre.css'

export default props => (
    <Container fluid className='FHeight'>

        <Col className='p-0 m-0 mt-3 border border-primary rounded'>
            <Col className='titulo p-0 m-0 text-center'>
                <span>Tecnologia utilizada</span>
            </Col>

            <Col className='p-0 m-0 textDesc'>
            </Col>
        </Col>

        <Col className='p-0 m-0 mt-3 border border-primary rounded'>
            <Col className='titulo p-0 m-0 text-center'>
                Funcionamento do Sistema
            </Col>

            <Col className='p-0 m-0 textDesc'>
            </Col>
        </Col>

        <Col className='p-0 m-0 mt-3 border border-primary rounded'>
            <Col className='titulo p-0 m-0 text-center'>
                Modo de integração
            </Col>

            <Col className='p-0 m-0 textDesc'>
            </Col>
        </Col>

        <Col className='p-0 m-0 mt-3 border border-primary rounded'>
            <Col className='titulo p-0 m-0 text-center'>
                Custos
            </Col>
            
            <Col className='p-0 m-0 textDesc'>
            </Col>
        </Col>

    </Container>
)