import 'modules/bootstrap/dist/css/bootstrap.min.css'

import React, {Component} from 'react'
import {Button, Col, Container, FormControl, InputGroup, Pagination, Row, Table} from 'react-bootstrap'

import Menu from '../menu/menu'


export default props => (
    <Container fluid className='p-0 m-0 FHeight'>
        <Menu />
    </Container>
)